import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
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

    constructor(user?: Partial<User>) {
        this.id = user?.id ?? uuidv4();
        this.email = user?.email ?? '' 
        this.password = user?.password ?? '' 
        this.name = user?.name ?? ''
    }
}