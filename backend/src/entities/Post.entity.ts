import { Species } from './Species.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({unique: true})
    title: string;

    @Column({nullable: true})
    mainText: string;

    @ManyToMany(() => Species)
    @JoinTable()
    relatedSpecies:Species[] | undefined;


    constructor(post?: Partial<Post>) {
        post?.id && (this.id = post.id)
        this.title = post?.title ?? '' 
        this.mainText = post?.mainText ?? '' 
        // this.relatedSpecies = post?.relatedSpecies ?? ''
    }
}