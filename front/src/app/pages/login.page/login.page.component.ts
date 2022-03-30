import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login.page',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;
  isSubmit: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.isLoading = true;
    this.isSubmit = true;
    this.userService.login({lastname: "tarek", email: "", firstname: ""});
  }
}
