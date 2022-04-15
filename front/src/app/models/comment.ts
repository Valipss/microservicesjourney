import {SQLItem} from "./base";
import {User} from "./user";

export interface Comment extends SQLItem {
    text: string
    user: User
}
