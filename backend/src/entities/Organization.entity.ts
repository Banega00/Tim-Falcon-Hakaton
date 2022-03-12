import { Species } from './Species.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';
@Entity()
export class Organization{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({unique: true})
    title: string;

    @Column({nullable: true})
    mainText: string;

    // @OneToMany(() => User)
    // @JoinTable()
    // userId:User[] | undefined;


    constructor(post?: Partial<Organization>) {
        post?.id && (this.id = post.id)
        this.title = post?.title ?? '' 
        this.mainText = post?.mainText ?? '' 
        // this.relatedSpecies = post?.relatedSpecies ?? ''
    }
}