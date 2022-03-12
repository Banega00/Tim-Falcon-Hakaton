import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    title: string;

    @Column({nullable: true})
    mainText: string;

    @ManyToMany(() => Category)
    @JoinTable()
    relatedSpecies: [];


    constructor(post?: Partial<Post>) {
        post?.id && (this.id = post.id)
        this.id = user?.id ?? uuidv4();
        this.email = user?.email ?? '' 
        this.password = user?.password ?? '' 
        this.name = user?.name ?? ''
    }
}