import { Species } from './Species.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User.entity';
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
    relatedSpecies?:Species[] | undefined;

    @ManyToOne(() => User, user => user.posts)
    @JoinTable()
    user?:User | undefined;

    constructor(post?: Partial<Post>) {
        post?.id && (this.id = post.id)
        this.title = post?.title ?? '' 
        this.mainText = post?.mainText ?? '' 
        this.user = post?.user
        this.relatedSpecies = post?.relatedSpecies
        // this.relatedSpecies = post?.relatedSpecies ?? ''
    }
}