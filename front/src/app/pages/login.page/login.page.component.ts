import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

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

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log(this.loginForm.getRawValue());
    this.isLoading = true;
    this.isSubmit = true;
    console.log(this.loginForm.controls['email'].errors);
    console.log(this.loginForm.controls['email'].errors?.['required'])
  }
}
