import { EntityManager, getManager } from "typeorm";
import { User } from "../entities/User.entity";

export class _UserRepository{

    public async getAll(entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.find(User,{relations: ['species', 'animalProfiles', 'organizations','posts']})
    }
    
    public async deleteById(id: string, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.delete(User, id)
    }

    public async findByIdOrCreate(userData: User, entityManager?: EntityManager) {
        const user = await this.findById(userData.id)
        if(user) return user;


        await this.addNewUser(new User(userData));
    }

    public async findById(userId: string, entityManager?: EntityManager): Promise<User|undefined>{
        const manager = entityManager || getManager();
        return await manager.findOne(User, userId,{relations: ['species', 'animalProfiles', 'organizations','posts']})
    }

    public async findByEmail(email: string, entityManager?: EntityManager): Promise<User|undefined>{
        const manager = entityManager || getManager();
        return await manager.findOne(User, {email: email})
    }

    public async addNewUser(newUser: User, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return await manager.save(User, new User(newUser))
    }

}

export const UserRepository = new _UserRepository();