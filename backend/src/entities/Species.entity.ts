import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Post } from "./Post.entity";
@Entity()
export class Species{
    @PrimaryGeneratedColumn()
    id: string | undefined;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    alive?: number;

    @Column({nullable: true})
    dead?: number;

    
    @Column({nullable: true})
    description?: string;

    @ManyToMany(() => Post)
    @JoinTable()
    relatedSpecies:Post[] | undefined;
  

    constructor(species?: Partial<Species>) {
        species?.id && (this.id = species.id)
        this.name = species?.name ?? '' 
        this.alive = species?.alive ?? 0 
        this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 
    }
}