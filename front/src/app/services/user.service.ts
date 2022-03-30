import {User} from '../models/user';
import {Router} from "@angular/router";
import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
    private _user!: User;
    private _isLogged: boolean = false;
    isLoggedChange: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router) {
        this.isLoggedChange.subscribe((value) => {
            this._isLogged = value;
        });
    }

    ngOnDestroy(): void {
        this.isLoggedChange.unsubscribe();
    }

    toggleIsLogged() {
        this.isLoggedChange.next(!this._isLogged);
    }

    init() {
        const token = localStorage.getItem('jwt');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            this._isLogged = true;
            this._user = {
                //TODO remove fake data
                email: "paulsurrans@gmail.com", firstname: "paul", lastname: "surrans"
            }
        }
    }

    login(user: User) {
        //TODO log user with credentials and store in ls
        localStorage.setItem('jwt', 'toto');
        localStorage.setItem('userId', '2189218921');
        this.router.navigate(['/dashboard']);
        this.toggleIsLogged();
    }

    logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
        this.toggleIsLogged();
    }

    getUserId() {
        return this._user.id;
    }

    getUserName() {
        return this._user.lastname + ' ' + this._user.firstname;
    }

    getLoggedStatus() {
        return this._isLogged;
    }
}
