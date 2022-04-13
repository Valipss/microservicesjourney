import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  user: User | undefined;
  options: AnimationOptions = {
    path: '/assets/animations/home-animation.json',
  };

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
  }

}
