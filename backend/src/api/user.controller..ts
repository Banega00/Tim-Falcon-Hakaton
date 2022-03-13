import { ErrorStatusCode } from '../utils/status-codes';
import { UserRepository } from '../repository/user.repository';
import { Request, Response } from "express";
import { sendResponse } from '../utils/wrappers/response-wrapper';
import { SuccessStatusCode } from '../utils/status-codes';
import { SpeciesRepository } from '../repository/species.repository';
import { AnimalProfileRepository } from '../repository/animal_profle.repository';

export class UserController{

    getAllUsers = async (request: Request, response: Response) =>{
        try{
            const users = await UserRepository.getAll()
            return sendResponse(response, 200, SuccessStatusCode.Success, users)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }

    followASpecies = async (request: Request, response: Response) =>{
        const { id } = request.params;
        console.log(request.session.passport);
        
        try{
            if(!request.session.passport)return  sendResponse(response, 500, ErrorStatusCode.Failure, 'Nema usera');
            const user = await UserRepository.findById(request.session.passport.id)
            const species = await SpeciesRepository.findById(+id)
            if(!species)return  sendResponse(response, 500, ErrorStatusCode.Failure, 'Nema species');
            user?.species?.push(species)
            if(!user) return sendResponse(response, 404, ErrorStatusCode.UserNotFound)
            await UserRepository.saveUser(user)
            console.log(user)
            return sendResponse(response, 200, SuccessStatusCode.Success, user)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    followAnAnimal = async (request: Request, response: Response) =>{
        const { id } = request.params;
        console.log(request.session.passport);
        
        try{
            if(!request.session.passport)return  sendResponse(response, 500, ErrorStatusCode.Failure, 'Nema usera');
            const user = await UserRepository.findById(request.session.passport.id)
            const animalProfiles = await AnimalProfileRepository.findById(+id)
            if(!animalProfiles)return  sendResponse(response, 500, ErrorStatusCode.Failure, 'Nema animal');
            user?.animalProfiles?.push(animalProfiles)
            if(!user) return sendResponse(response, 404, ErrorStatusCode.UserNotFound)
            await UserRepository.saveUser(user)
            console.log(user)

            return sendResponse(response, 200, SuccessStatusCode.Success, user)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    getUserById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            const user = await UserRepository.findById(id)
            if(!user) return sendResponse(response, 404, ErrorStatusCode.UserNotFound)
            return sendResponse(response, 200, SuccessStatusCode.Success, user)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    
    deleteUserById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            await UserRepository.deleteById(id)
            return sendResponse(response, 200, SuccessStatusCode.Success)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
}