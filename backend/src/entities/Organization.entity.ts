import { Species } from './Species.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';
@Entity()
export class Organization{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    location: string;
    // @OneToMany(() => User)
    // @JoinTable()
    // userId:User[] | undefined;


    constructor(post?: Partial<Organization>) {
        post?.id && (this.id = post.id)
        this.name = post?.name ?? '' 
        this.description = post?.description ?? '' 
        this.location = post?.location ?? '' 
        // this.relatedSpecies = post?.relatedSpecies ?? ''
    }
}