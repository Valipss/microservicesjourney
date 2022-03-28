import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/home-animation.json',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
