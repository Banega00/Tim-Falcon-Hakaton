import { EntityManager, getManager } from "typeorm";
import { Post } from "../entities/Post.entity";

export class _PostRepository{

    public async getAll(entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.find(Post)
    }
    
    public async deleteById(id: number, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.delete(Post, id)
    }

    public async findByIdOrCreate(postData: Post, entityManager?: EntityManager) {
        if(!postData.id) return ;
        const post = await this.findById(postData.id)
        if(post) return post;

        await this.addNewPost(new Post(postData));
    }

    public async findById(postId: number, entityManager?: EntityManager): Promise<Post|undefined>{
        const manager = entityManager || getManager();
        return await manager.findOne(Post, postId)
    }

    // public async findByEmail(email: string, entityManager?: EntityManager): Promise<Species|undefined>{
    //     const manager = entityManager || getManager();
    //     return await manager.findOne(User, {email: email})
    // }

    public async addNewPost(newPost: Post, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return await manager.save(Post, new Post(newPost))
    }

}

export const PostRepository = new _PostRepository();