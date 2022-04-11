import {User} from '../models/user';
import {Router} from "@angular/router";
import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {stringify} from "@angular/compiler/src/util";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
    private _user!: User;
    private _isLogged: boolean = false;
    isLoggedChange: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router,
                private snackBar: MatSnackBar) {
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

    async init() {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            let request = await fetch('http://localhost:3031/users/' + localStorage.getItem('userId'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (request.ok) {
                const data = await request.json();
                console.log(data);
                this._user = data;
                this.toggleIsLogged();
            } else {
                this.logout();
            }
        }
    }

    async login(user: User) {
        let request = await fetch('http://localhost:3031/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": user.email, "password": user.password, "strategy": "local"})
        });
        console.log(request);
        if (request?.ok) {
            const data = await request.json();
            if (data) {
                console.log(data);
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('userId', data.user.id);
                this.toggleIsLogged();
                this.router.navigate(['/dashboard']);
            } else {
                this.snackBar.open('An error occurred. Please retry later.', '', {
                    duration: 4000,
                    panelClass: ['danger-snackbar']
                });
            }
        } else {
            this.snackBar.open('An error occurred. Please retry later.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            })
        }
    }

    async signup(user: User) {
        let request = await fetch('http://localhost:3031/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (request?.ok) {
            return await request.json();
        } else {
            this.snackBar.open('An error occurred. Please retry later.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            })
            return null;
        }
    }

    logout() {
        localStorage.removeItem('accessToken');
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
