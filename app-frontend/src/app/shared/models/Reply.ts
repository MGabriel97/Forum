import {Post} from "./post";
import {User} from "./user";

export class Reply {
    id: number;
    datapPost: string;
    user: User;
    post:Post;
    dateTime:string;
    image:any;

}