import { ErrorStatusCode } from '../utils/status-codes';
import { AnimalProfileRepository } from '../repository/animal_profle.repository';
import { Request, Response } from "express";
import { sendResponse } from '../utils/wrappers/response-wrapper';
import { SuccessStatusCode } from '../utils/status-codes';

export class AnimalProfileController{

    getAllAnimalProfiles = async (request: Request, response: Response) =>{
        try{
            const animalProfile = await AnimalProfileRepository.getAll()
            return sendResponse(response, 200, SuccessStatusCode.Success, animalProfile)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }

    getAnimalProfileById = async (request: Request, response: Response) =>{
        let { id } = request.params; 
        try{
            console.log(id)
            const animalProfile = await AnimalProfileRepository.findById(+id)
            if(!animalProfile) return sendResponse(response, 404, ErrorStatusCode.PostNotFound)
            return sendResponse(response, 200, SuccessStatusCode.Success, animalProfile)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    
    deleteAnimalProfileById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            await AnimalProfileRepository.deleteById(+id)
            return sendResponse(response, 200, SuccessStatusCode.Success)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
}