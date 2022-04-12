import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class RedirectIfLogged implements CanActivate {
    constructor(private router: Router, private snackBar: MatSnackBar, private userService: UserService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLogged = localStorage.getItem('userId') !== null;

        if (isLogged) {
            this.router.navigate(['/dashboard']).then();
            return false;
        } else {
            return true;
        }
    }
}
