import { json } from "body-parser";
import express from "express";
import { checkAuthenticated, configurePassport } from "./authorization/passport-configuration";
import { validateRequestPayload } from "./utils/validation/validator";
import { sendInvalidMethodResponse } from "./utils/wrappers/response-wrapper";
import passport from "passport";
import * as router from './router/router'
import cors from 'cors'

const app: express.Application = express();

app.use(cors({credentials: true, origin:true}))
app.use(json({limit: "50mb", type: "application/json"}));

//Middleware for validating requests payload
app.use(validateRequestPayload);

configurePassport(app, passport);

// app.use(checkAuthenticated)
//Set routers
app.use('/', router.UserRouter)
app.use('/', router.AnimalProfileRouter)
app.use('/', router.PostRouter)
app.use('/', router.SpeciesRouter)

// app.use('/operation', routers.OperationsRouter);
// app.use('/internal', routers.InternalRouter);
// app.use('/report', routers.ReportsRouter);

app.use(sendInvalidMethodResponse);

export default app;