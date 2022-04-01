import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

function PasswordMatchValidator(control: AbstractControl): ValidationErrors | null {
  let regex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{5,}$');

  const password = control.get('password')!.value;
  const passwordConfirmation = control.get('passwordConfirmation')!.value;

  if (!regex.test(password)) {
    return { passwordEz: true }
  }
  return password === passwordConfirmation ? null : { passwordMatch: true };
}

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
  }, PasswordMatchValidator );
  passwordConfirmationError: string = "";

  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  async submitForm() {
    this.isSubmit = true;

    console.log(this.signUpForm.errors);
    if (this.signUpForm.valid) {
      this.isLoading = true;

      let requestSuccess = await this.userService.signup({
        "firstname": this.signUpForm.get('firstname')!.value,
        "lastname": this.signUpForm.get('lastname')!.value,
        "email": this.signUpForm.get('email')!.value,
        "password": this.signUpForm.get('password')!.value,
      });
      if (requestSuccess) {
        await this.userService.login({
          "firstname": this.signUpForm.get('firstname')!.value,
          "lastname": this.signUpForm.get('lastname')!.value,
          "email": this.signUpForm.get('email')!.value,
          "password": this.signUpForm.get('password')!.value,
        });
      } else {
        this.snackBar.open('An error occurred. Please retry later.', '', {
          duration: 4000,
          panelClass: ['danger-snackbar']
        });
      }
      this.isLoading = false;
    } else {
      if (this.signUpForm.errors?.['passwordEz']) {
        this.signUpForm.get('password')!.setErrors({'passwordEz': true});
      } else if (this.signUpForm.errors?.['passwordMatch']) {
        console.log('error match');
        this.signUpForm.get('passwordConfirmation')!.setErrors({'passwordMatch': true});
        console.log(this.signUpForm.get('passwordConfirmation')?.errors);
      }
    }
  }
}
