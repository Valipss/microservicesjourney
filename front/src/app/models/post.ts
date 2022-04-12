import {SQLItem} from "./base";

export interface Post extends SQLItem {
    title: string,
    body: string,
    image?: File | string
}
