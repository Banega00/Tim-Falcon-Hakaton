import { EntityManager, getManager } from "typeorm";
import { Species } from "../entities/Species.entity";

export class _SpeciesRepository{

    public async getAll(entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.find(Species)
    }
    
    public async deleteById(id: string, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.delete(Species, id)
    }

    public async findByIdOrCreate(speciesData: Species, entityManager?: EntityManager) {
        if(!speciesData.id) return ;
        const species = await this.findById(speciesData.id)
        if(species) return species;

        await this.addNewSpecies(new Species(speciesData));
    }

    public async findById(speciesId: number, entityManager?: EntityManager): Promise<Species|undefined>{
        const manager = entityManager || getManager();
        return await manager.findOne(Species, speciesId)
    }

    // public async findByEmail(email: string, entityManager?: EntityManager): Promise<Species|undefined>{
    //     const manager = entityManager || getManager();
    //     return await manager.findOne(User, {email: email})
    // }

    public async addNewSpecies(newSpecies: Species, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return await manager.save(Species, new Species(newSpecies))
    }

}

export const SpeciesRepository = new _SpeciesRepository();