import { GeoData, Species } from './Species.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User.entity';

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
    species?:Species | undefined;

    @Column({nullable: true})
    location?: string;

    @Column({nullable: true})
    food?: string;

    @Column(
        'simple-array',
        {
            nullable: false,
            default: []
        }
    )
    images?: string[] | undefined;

    @Column(
        'simple-array',
        {
            nullable: false,
            default: []
        }
    )
    geoData?: [number, number] | undefined;

    @ManyToMany(() => User)
    @JoinTable() 
    users?: User[] | undefined; 

    constructor(animalProfile?: Partial<AnimalProfile>) {
        animalProfile?.id && (this.id = animalProfile.id)
        this.name = animalProfile?.name ?? '' 
        this.monthsOld = animalProfile?.monthsOld ?? 0 
        this.images = animalProfile?.images; 
    }
}