import {SQLItem} from "./base";

export interface Image extends SQLItem {
    hash: string,
    userId: string,
    postId: string
}
