import {SQLItem} from "./base";
import {Image} from "./image";
import {Comment} from "./comment";

export interface Post extends SQLItem {
    title: string,
    body: string,
    userId: string,
    image?: Image,
    file?: File | string
    comments?: Comment[]
}
