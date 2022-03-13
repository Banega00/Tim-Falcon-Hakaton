import { AnimalProfile } from './AnimalProfile.entity';
import { Post } from "./Post.entity";

export type GeoData = [number, number]

export class Species{
    id: number | undefined;
    name: string;
    alive: number[];

    // @Column({nullable: true})
    // dead?: number;
    description?: string;
    relatedSpecies?:Post[] | undefined;
    animalProfiles?:AnimalProfile[] | undefined;
    images?: string[] | undefined;
    geoData?: GeoData[][] | undefined;

    constructor(species?: Partial<Species>) {
        species?.id && (this.id = species.id)
        this.name = species?.name ?? '' 
        this.alive = species?.alive ?? []
        // this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
        this.animalProfiles = species?.animalProfiles
        this.relatedSpecies = species?.relatedSpecies
    }
}