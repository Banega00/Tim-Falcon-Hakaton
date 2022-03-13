import { Organization } from './Organization.entity';
import { AnimalProfile } from './AnimalProfile.entity';
import { Post } from "./Post.entity";
import { Biome, ConservationStatus, ContinentEnum } from './Enums';

export type GeoData = [number, number]
export class Species{
    id: number | undefined;

    name: string;

    alive: number[];

    // @Column({nullable: true})
    // dead?: number;
    description?: string;
    continent?: ContinentEnum[];

    conservationStatus: ConservationStatus;
    reasonOfEndangerment: string;

    howToHelp: string;

    posts?:Post[] | undefined;

    animalProfiles?:AnimalProfile[] | undefined;

    organizations?:Organization[] | undefined;

    images: string[];
    
    biome: Biome;
    geoData?: GeoData[][] | undefined;

    constructor(species?: Partial<Species>) {
        species?.id && (this.id = species.id)
        this.name = species?.name ?? '' 
        this.reasonOfEndangerment = species?.reasonOfEndangerment ?? ''
        this.howToHelp = species?.howToHelp ?? '' 
        // this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
        this.animalProfiles = species?.animalProfiles
        this.images = species?.images ?? []
        this.alive = species?.alive ?? []
        this.posts = species?.posts
        this.continent = species?.continent
        this.conservationStatus = species?.conservationStatus ?? ConservationStatus.Conservation_Dependent
        this.biome = species?.biome ?? Biome.Grassland

    }
}

