import { GeoData, Species } from './Species.entity';
import { User } from './User.entity';

export class AnimalProfile{
    id: number | undefined;

    name: string;

    monthsOld: number;

    species?:Species | undefined;
    images: string[];
    location?: string;
    geoData?: [number, number] | undefined;
    users: User[]
    food: string;
    constructor(animalProfile?: Partial<AnimalProfile>) {
        animalProfile?.id && (this.id = animalProfile.id)
        this.food = animalProfile?.food ?? '' 
        this.name = animalProfile?.name ?? '' 
        this.monthsOld = animalProfile?.monthsOld ?? 0 
        this.images = animalProfile?.images ?? []
        this.users = animalProfile?.users ?? []
    }
}