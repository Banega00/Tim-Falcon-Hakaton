import { AnimalProfile } from './AnimalProfile.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";

export type GeoData = [number, number]

@Entity()
export class Species{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({unique: true})
    name: string;

    @Column(
        'simple-array',
        {
            nullable: false,
            default: []
        }
    )
    alive?: number[];

    // @Column({nullable: true})
    // dead?: number;
    
    @Column({nullable: true})
    description?: string;

    @ManyToMany(() => Post)
    @JoinTable() 
    posts?:Post[] | undefined;

    @OneToMany(() => AnimalProfile, animalProfile => animalProfile.species)
    @JoinTable()
    animalProfiles?:AnimalProfile[] | undefined;

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
    geoData?: GeoData[][] | undefined;

    constructor(species?: Partial<Species>) {
        species?.id && (this.id = species.id)
        this.name = species?.name ?? '' 
        this.alive = species?.alive 
        // this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
        this.animalProfiles = species?.animalProfiles
        this.posts = species?.posts
    }
}

