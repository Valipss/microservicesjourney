import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = localStorage.getItem('userId') !== null;

    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']).then(() => {
        this.snackBar.open('You have to be logged to access this page.', '', {
          duration: 4000,
          panelClass: ['danger-snackbar']
        });
      });
      return false;
    }
  }
}
