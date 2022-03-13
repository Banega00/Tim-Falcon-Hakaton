import { env } from './../utils/wrappers/env-wrapper';
import { Application, NextFunction, Request, Response } from "express";
import { PassportStatic } from 'passport';
import { ErrorStatusCode, SuccessStatusCode } from "../utils/status-codes";
import { sendResponse } from "../utils/wrappers/response-wrapper";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRepository } from "../repository/user.repository";
import { Strategy as LocalStrategy } from 'passport-local'
import ExpressSession from 'express-session';
import { User } from '../entities/User.entity';

declare module 'express-session' {
  export interface SessionData {
    passport: User
  }
}


export const configurePassport = (app: Application, passport: PassportStatic) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },

    async function (email, password, done) {
      try{
        const user = await UserRepository.findByEmail(email);
        if (!user) return done(null, false, { message: "Invalid email" });
        if (user?.password != password) {
          return done(null, false, { message: "Invalid password" });
        }
        return done(null, user);
      }catch(error){
        return done(error, null);
      }
    }
  ));


  passport.use(new GoogleStrategy({
    clientID: env.google.clientID,
    clientSecret: env.google.clientSecret,
    callbackURL: env.google.callbackURL,
    passReqToCallback: true
  },

    async function (request, accessToken, refreshToken, profile, done) {
      const email = profile.emails?.[0]?.value
      if (!email) throw new Error("INVALID EMAIL")
      let userData: User = { email: email, id: profile.id, name: profile.displayName }
      const user = await UserRepository.findByIdOrCreate(userData);

      return done(null, user);
    }
  ));

  //2. Express-session config
  app.use(ExpressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie:{
      httpOnly: false
    }
  }));

  //Passport initialization has to be after Express-session initialization
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user: any, done: Function) {
    done(null, user);
  });

  passport.deserializeUser(function (user: any, done: Function) {
    try {
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  //FOR GOOGLE OAUTH2 STRATEGY
  app.get('/login/google', (request: Request, response: Response, next) => {
    passport.authenticate('google', {
      scope: ['email', 'profile']
    })(request, response, next);//IIFE - immediately invoked function expression
  })

  //This is called when user choose login profile
  //here only code from URL is available
  //FOR GOOGLE OAUTH2 STRATEGY
  app.get('/google-oauth-cb', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: 'http://localhost:3001/successGoogleLogin'
  }),
  )

  const authenticationFunction = (request: Request, response: Response, next) =>{
    passport.authenticate('local', (error: any, user:User, info: any) => {
      if (error) return sendResponse(response, 401, ErrorStatusCode.Failure, error); //if server error occured
      if (!user) return sendResponse(response, 401, ErrorStatusCode.Failure, info); //custom message
      else {
        
        //Because of custom callback we have responsibility to establish an express-session by calling request.login
        request.logIn(user, function (error) {
          if (error) return sendResponse(response, 401, ErrorStatusCode.Failure, error);
          return sendResponse(response, 200, SuccessStatusCode.Success, user);
        });
      }
    })(request, response, next)
  }

  //FOR LOCAL STRATEGY
  //login route - calling custom callbaback
  app.post('/login', (request: Request, response: Response, next) => {
    authenticationFunction(request,response,next);
  })

  app.post('/register', async (request: Request, response: Response, next)=>{
    const newUser:User = request.body

    try{
      await UserRepository.saveUser(newUser);

    }catch(error){
      console.log("Error while registering user: " , error);
      return sendResponse(response, 500, ErrorStatusCode.Failure, error);
    }
    
    //Part for login after register
    authenticationFunction(request,response,next);
  })

  //Check auth middleware
  app.get('/checkAuth', checkAuthenticated, (request: Request, response: Response) => sendResponse(response, 200, 20000, request.session.passport))

  app.get('/logout', checkAuthenticated, (request: Request, response: Response) => {
    request.session.destroy(()=>{});
    return sendResponse(response, 200, 20000);
  })
}

export const checkAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  if (request.isAuthenticated()) { 
    return next();
  }
  return sendResponse(response, 401, ErrorStatusCode.Unauthorized);
}
