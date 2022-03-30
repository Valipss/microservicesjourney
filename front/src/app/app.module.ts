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
import { PostCardComponent } from './components/post-card/post-card.component';
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {PostPageComponent} from './pages/post.page/post.page.component';
import {CommonModule} from "@angular/common";
import { DeletePostDialogComponent } from './components/delete-post-dialog/delete-post-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "./services/user.service";
import {PostService} from "./services/post.service";

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
    FormFieldErrorComponent,
    PostCardComponent,
    PostPageComponent,
    DeletePostDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatRippleModule,
        MatSnackBarModule,
        CommonModule,
        MatDialogModule
    ],
  providers: [UserService, PostService],
  bootstrap: [AppComponent]
})

export class AppModule { }
