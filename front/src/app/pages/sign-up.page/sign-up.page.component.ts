import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up.page',
  templateUrl: './sign-up.page.component.html',
  styleUrls: ['./sign-up.page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  isSubmit: boolean = false;
  isLoading: boolean = false;
  signUpForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    passwordConfirmation: new FormControl("", Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    this.isLoading = true;
    this.isSubmit = true;
  }
}
