import {SQLItem} from "./base";

export interface User extends SQLItem {
    email: string,
    firstname?: string,
    lastname?: string,
    password?: string
}
