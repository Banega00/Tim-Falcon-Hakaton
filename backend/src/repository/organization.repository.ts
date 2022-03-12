import { EntityManager, getManager } from "typeorm";
import { Organization } from "../entities/Organization.entity";

export class _OrganizationRepository{

    public async getAll(entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.find(Organization)
    }
    
    public async deleteById(id: number, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.delete(Organization, id)
    }

    public async findByIdOrCreate(organizationData: Organization, entityManager?: EntityManager) {
        if(!organizationData.id) return ;
        const organization = await this.findById(organizationData.id)
        if(organization) return organization;

        await this.addNewOrganization(new Organization(organizationData));
    }

    public async findById(organizationId: number, entityManager?: EntityManager): Promise<Organization|undefined>{
        const manager = entityManager || getManager();
        return await manager.findOne(Organization, organizationId)
    }

    // public async findByEmail(email: string, entityManager?: EntityManager): Promise<Species|undefined>{
    //     const manager = entityManager || getManager();
    //     return await manager.findOne(User, {email: email})
    // }

    public async addNewOrganization(newOrganization: Organization, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return await manager.save(Organization, new Organization(newOrganization))
    }

}

export const OrganizationRepository = new _OrganizationRepository();