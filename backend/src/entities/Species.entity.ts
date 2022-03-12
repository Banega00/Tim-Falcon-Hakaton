import { AnimalProfile } from './AnimalProfile.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Post } from "./Post.entity";
@Entity()
export class Species{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    alive?: number;

    // @Column({nullable: true})
    // dead?: number;
    
    @Column({nullable: true})
    description?: string;

    @ManyToMany(() => Post)
    @JoinTable()
    relatedSpecies:Post[] | undefined;

    @OneToMany(() => AnimalProfile, animalProfile => animalProfile.species)
    @JoinTable()
    animalProfiles:AnimalProfile[] | undefined;

    @Column(
        'simple-array',
        {
            nullable: false,
            default: []
        }
    )
    images: string[] | undefined;

    constructor(species?: Partial<Species>) {
        species?.id && (this.id = species.id)
        this.name = species?.name ?? '' 
        this.alive = species?.alive ?? 0 
        // this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
        this.animalProfiles = species?.animalProfiles
    }
}