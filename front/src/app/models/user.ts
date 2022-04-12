import {SQLItem} from "./base";
import {Post} from "./post";

export interface User extends SQLItem {
    email: string,
    firstname?: string,
    lastname?: string,
    password?: string,
    posts?: Post[]
}
