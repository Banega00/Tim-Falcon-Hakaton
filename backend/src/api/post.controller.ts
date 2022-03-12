import { ErrorStatusCode } from '../utils/status-codes';
import { PostRepository } from '../repository/post.repository';
import { Request, Response } from "express";
import { sendResponse } from '../utils/wrappers/response-wrapper';
import { SuccessStatusCode } from '../utils/status-codes';

export class PostController{

    getAllPosts = async (request: Request, response: Response) =>{
        try{
            const posts = await PostRepository.getAll()
            return sendResponse(response, 200, SuccessStatusCode.Success, posts)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }

    getPostById = async (request: Request, response: Response) =>{
        let { id } = request.params; 
        try{
            const post = await PostRepository.findById(+id)
            if(!post) return sendResponse(response, 404, ErrorStatusCode.PostNotFound)
            return sendResponse(response, 200, SuccessStatusCode.Success, post)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    
    deletePostById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            await PostRepository.deleteById(+id)
            return sendResponse(response, 200, SuccessStatusCode.Success)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
}