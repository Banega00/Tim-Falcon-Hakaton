import { Organization } from './Organization.entity';
import { AnimalProfile } from './AnimalProfile.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";

export type GeoData = [number, number]

export enum ContinentEnum  {
    EUROPE='Europe',
    ASIA = 'Asia',
    AFRICA = 'Africa',
    NORTH_AMERICA = 'North America',
    SOUTH_AMERICA = 'North America',
    AUSTRAILA = 'Australia',
    ANTARTICA = 'Antartica'

}
export enum Biome {
    Aquatic = 'Aquatic',
    Grassland = 'Grassland',
    Forest = 'Forest',
    Desert = 'Desert',
    Tundra = 'Tundra'
}
export enum ConservationStatus {
    Extinct = 'Extinct',
    Extinct_in_the_wild = 'Extinct in the wild',
    Critically_endangered  = 'Critically endangered ',
    Endangered = 'Endangered',
    Vulnerable = 'Vulnerable',
    Near_threatened  = 'Near threatened ',
    Conservation_Dependent = 'Conservation Dependent',
    Least_concern = 'Least concern'

}
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

    @Column(
        'simple-array',
        {
        nullable: true,
        default: null
    })
    continent?: ContinentEnum[];

    @Column(
        {
        nullable: true,
        default: ConservationStatus.Endangered
    })
    conservationStatus: ConservationStatus;
    @Column({nullable: true})
    reasonOfEndangerment: string;

    @Column({nullable: true})
    howToHelp: string;

    @ManyToMany(() => Post)
    @JoinTable() 
    posts?:Post[] | undefined;

    @OneToMany(() => AnimalProfile, animalProfile => animalProfile.species)
    @JoinTable()
    animalProfiles?:AnimalProfile[] | undefined;

    @ManyToMany(() => Organization)
    @JoinTable() 
    organizations?:Organization[] | undefined;

    @Column(
        'simple-array',
        {
            nullable: false,
            default: []
        }
    )
    images?: string[] | undefined;
    

    @Column({
        nullable: true,
        default: ConservationStatus.Endangered
    })
    biome: Biome;

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
        this.reasonOfEndangerment = species?.reasonOfEndangerment ?? ''
        this.howToHelp = species?.howToHelp ?? '' 
        // this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
        this.animalProfiles = species?.animalProfiles
        this.posts = species?.posts
        this.continent = species?.continent
        this.conservationStatus = species?.conservationStatus ?? ConservationStatus.Conservation_Dependent
        this.biome = species?.biome ?? Biome.Grassland

    }
}

