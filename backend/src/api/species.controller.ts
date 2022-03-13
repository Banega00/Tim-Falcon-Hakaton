import { ErrorStatusCode } from '../utils/status-codes';
import { SpeciesRepository } from '../repository/species.repository';
import { Request, Response } from "express";
import { sendResponse } from '../utils/wrappers/response-wrapper';
import { SuccessStatusCode } from '../utils/status-codes';

export class SpeciesController{

    getAllSpecies = async (request: Request, response: Response) =>{
        try{
            const species = await SpeciesRepository.getAll()
            return sendResponse(response, 200, SuccessStatusCode.Success, species)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }

    followASpecies = async (request: Request, response: Response) =>{
        let { id } = request.params; 
        console.log(request.session.passport);
        try{
            const species = await SpeciesRepository.findById(+id)
            if(!species) return sendResponse(response, 404, ErrorStatusCode.PostNotFound)
            return sendResponse(response, 200, SuccessStatusCode.Success, species)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }

    getSpeciesById = async (request: Request, response: Response) =>{
        let { id } = request.params; 
        try{
            const species = await SpeciesRepository.findById(+id)
            if(!species) return sendResponse(response, 404, ErrorStatusCode.PostNotFound)
            return sendResponse(response, 200, SuccessStatusCode.Success, species)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    
    deleteSpeciesById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            await SpeciesRepository.deleteById(+id)
            return sendResponse(response, 200, SuccessStatusCode.Success)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
}