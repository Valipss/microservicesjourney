import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomePageComponent} from "./pages/home.page/home.page.component";
import {FeedPageComponent} from "./pages/feed.page/feed.page.component";
import {LoginPageComponent} from "./pages/login.page/login.page.component";
import {SignUpPageComponent} from "./pages/sign-up.page/sign-up.page.component";
import {DashboardPageComponent} from "./pages/dashboard.page/dashboard.page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignUpPageComponent,
    LoginPageComponent,
    FeedPageComponent,
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
