import {SQLItem} from "./base";

interface User extends SQLItem {
    email: string,
    firstname: string,
    lastname: string,
    password?: string
}
