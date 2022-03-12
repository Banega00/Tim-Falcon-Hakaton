import { v4 as uuidv4 } from 'uuid';
import { Organization } from "./Organization.entity";
import { Post } from "./Post.entity";
export class User{
    id: string;
    email: string;
    password?: string;
    name: string;
    posts?:Post[] | undefined;
    organizations? :Organization[] | undefined;

    constructor(user?: Partial<User>) {
        this.id = user?.id ?? uuidv4();
        this.email = user?.email ?? '' 
        this.password = user?.password ?? '' 
        this.name = user?.name ?? ''
        this.organizations = user?.organizations
        this.posts = user?.posts
    }
}