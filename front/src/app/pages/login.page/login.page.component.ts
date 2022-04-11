import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  async submitForm() {
    this.isSubmit = true;

    if (this.loginForm.valid) {
      this.isLoading = true;
      await this.userService.login({
        "email": this.loginForm.get('email')!.value,
        "password": this.loginForm.get('password')!.value,
      });
      this.isLoading = false;
    }
  }
}
