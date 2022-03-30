import {SQLItem} from "./base";

export interface Post extends SQLItem {
    title: string,
    content: string,
    image: string,
}
