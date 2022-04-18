import {User} from '../models/user';
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {stringify} from "@angular/compiler/src/util";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
    private _user: User | undefined = undefined;
    private _isLogged: boolean = false;
    isLoggedChange: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router,
                private snackBar: MatSnackBar,
                private route: ActivatedRoute) {
        this.isLoggedChange.subscribe((value) => {
            this._isLogged = value;
        });
    }

    ngOnDestroy(): void {
        this.isLoggedChange.unsubscribe();
    }

    toggleIsLogged(logged: boolean) {
        this.isLoggedChange.next(logged);
    }

    async init() {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            let request = await fetch('http://localhost:3031/users/' + localStorage.getItem('userId') + '?$include[]={"name":"posts","include":["images"],"limit":100,"skip":1}', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (request.ok) {
                const data = await request.json();
                this._user = data;
                this.toggleIsLogged(true);
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
        if (request?.ok) {
            const data = await request.json();
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('userId', data.user?.id);
                this.toggleIsLogged(true);
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
        this._user = undefined;
        this.toggleIsLogged(false);
    }

    async getUser(): Promise<User | undefined> {
        await this.init();
        return this._user;
    }

    async getUserById(id: string) {
        if (id && localStorage.getItem('accessToken')) {
            let request = await fetch('http://localhost:3031/users/' + id + '?$include[]={"name":"posts","include":["images", "{\\"name\\":\\"comments\\",\\"include\\":[\\"users:user\\"]}"]}', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (request.ok) {
                return await request.json();
            } else {
                this.snackBar.open('An error occurred while getting post author.', '', {
                    duration: 4000,
                    panelClass: ['danger-snackbar']
                });
            }
        } else if (this.route.snapshot.queryParamMap.get('firstname')) {
            return {
                'firstname': this.route.snapshot.queryParamMap.get('firstname'),
                'lastname': this.route.snapshot.queryParamMap.get('lastname')
            }
        } else {
            return {
                'firstname': 'user',
                'lastname': 'a'
            }
        }
    }
}
