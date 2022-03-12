import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Post } from "./Post.entity";
@Entity()
export class User{
    @PrimaryColumn()
    id: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    password?: string;

    @Column({nullable: true})
    name: string;

    @OneToMany(() => Post, post => post.user)
    @JoinTable()
    posts?:Post[] | undefined;

    constructor(user?: Partial<User>) {
        this.id = user?.id ?? uuidv4();
        this.email = user?.email ?? '' 
        this.password = user?.password ?? '' 
        this.name = user?.name ?? ''
    }
}