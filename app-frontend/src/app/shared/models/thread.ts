import {Post} from "./post";
import {SubForum} from "./subforum";

export class Thread {
    id: number;
    namePost: string;
    nameThread: string;
    post:Post;
    subForum:SubForum;
    count:string;
    name:string;
    dateTime:string;
}