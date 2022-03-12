import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => User, user => user.organizations)
    @JoinTable()
    users?: User | undefined;


    constructor(post?: Partial<Organization>) {
        post?.id && (this.id = post.id)
        this.name = post?.name ?? '' 
        this.description = post?.description ?? '' 
        this.location = post?.location ?? ''
        this.users = post?.users 
    }
}