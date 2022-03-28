import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomePageComponent} from "./pages/home.page/home.page.component";
import {FeedPageComponent} from "./pages/feed.page/feed.page.component";
import {LoginPageComponent} from "./pages/login.page/login.page.component";
import {SignUpPageComponent} from "./pages/sign-up.page/sign-up.page.component";
import {DashboardPageComponent} from "./pages/dashboard.page/dashboard.page.component";
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
    return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignUpPageComponent,
    LoginPageComponent,
    FeedPageComponent,
    DashboardPageComponent,
    FormFieldErrorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
