import { Species } from './Species.entity';
import { User } from './User.entity';
export class Post{
    id: number | undefined;

    title: string;
    mainText: string;

    relatedSpecies?:Species[] | undefined;

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