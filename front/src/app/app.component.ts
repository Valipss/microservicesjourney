import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged: boolean = false;

  constructor(public router: Router,
              private userService: UserService) {
    this.userService.isLoggedChange.subscribe((value) => {
      this.isLogged = value;
      console.log(this.isLogged);
    });
    userService.init();
    console.log(this.isLogged);
  }

  ngOnInit(): void {

  }

  logout() {
    this.userService.logout();
  }
}
