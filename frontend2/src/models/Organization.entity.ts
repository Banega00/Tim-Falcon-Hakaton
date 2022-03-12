import { User } from './User.entity';
export class Organization{
    id: number | undefined;

    name: string;

    description: string;

    location: string;

    users?: User | undefined;


    constructor(post?: Partial<Organization>) {
        post?.id && (this.id = post.id)
        this.name = post?.name ?? '' 
        this.description = post?.description ?? '' 
        this.location = post?.location ?? ''
        this.users = post?.users 
    }
}