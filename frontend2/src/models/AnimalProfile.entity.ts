import { GeoData, Species } from './Species.entity';

export class AnimalProfile{
    id: number | undefined;

    name: string;

    monthsOld: number;

    species?:Species | undefined;
    images: string[];
    location?: string;
    geoData?: GeoData[] | undefined;

    constructor(animalProfile?: Partial<AnimalProfile>) {
        animalProfile?.id && (this.id = animalProfile.id)
        this.name = animalProfile?.name ?? '' 
        this.monthsOld = animalProfile?.monthsOld ?? 0 
        this.images = animalProfile?.images ?? []
    }
}