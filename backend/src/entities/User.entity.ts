import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Organization } from "./Organization.entity";
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

    @OneToMany(() => Organization, organization => organization.users)
    @JoinTable()
    organizations:Organization[] | undefined;

    constructor(user?: Partial<User>) {
        this.id = user?.id ?? uuidv4();
        this.email = user?.email ?? '' 
        this.password = user?.password ?? '' 
        this.name = user?.name ?? ''
        this.organizations = user?.organizations
        this.posts = user?.posts
    }
}