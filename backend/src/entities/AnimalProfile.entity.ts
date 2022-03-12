import { Species } from './Species.entity';
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AnimalProfile{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    monthsOld: number;

    @ManyToOne(() => Species, species => species.animalProfiles)
    @JoinTable()
    species:Species | undefined;

    @Column(
        'simple-array',
        {
            nullable: false,
            default: []
        }
    )
    images: string[] | undefined;

    constructor(animalProfile?: Partial<AnimalProfile>) {
        animalProfile?.id && (this.id = animalProfile.id)
        this.name = animalProfile?.name ?? '' 
        this.monthsOld = animalProfile?.monthsOld ?? 0 
        this.images = animalProfile?.images; 
    }
}