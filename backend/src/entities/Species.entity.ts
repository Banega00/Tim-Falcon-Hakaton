import { AnimalProfile } from './AnimalProfile.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";

type GeoData = [number, number]

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
    relatedSpecies?:Post[] | undefined;

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
    geoData?: GeoData[] | undefined;

    constructor(species?: Partial<Species>) {
        species?.id && (this.id = species.id)
        this.name = species?.name ?? '' 
        this.alive = species?.alive ?? 0 
        // this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
        this.animalProfiles = species?.animalProfiles
        this.relatedSpecies = species?.relatedSpecies
    }
}

const polygons: [number, number][][] =[
    [
      [
        19.599609375,
        45.120052841530544
      ],
      [
        21.884765625,
        43.70759350405294
      ],
      [
        22.9833984375,
        45.55252525134013
      ],
      [
        19.599609375,
        45.120052841530544
      ]
    ],
    [
      [
        11.3818359375,
        46.800059446787316
      ],
      [
        13.9306640625,
        49.866316729538674
      ],
      [
        9.580078125,
        49.15296965617042
      ],
      [
        9.0966796875,
        47.84265762816538
      ],
      [
        11.3818359375,
        46.800059446787316
      ]
    ]
  ]