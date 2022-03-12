import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Species{
    @PrimaryColumn()
    id: string;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    alive?: number;

    @Column({nullable: true})
    dead?: number;

    
    @Column({nullable: true})
    description?: string;

    
  

    constructor(species?: Partial<Species>) {
        this.id = species?.id ?? uuidv4();
        this.name = species?.name ?? '' 
        this.alive = species?.alive ?? 0 
        this.dead = species?.dead ?? 0
        this.description = species?.description ?? '' 

    }
}