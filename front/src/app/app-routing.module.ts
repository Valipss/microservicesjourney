import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login.page/login.page.component";
import {SignUpPageComponent} from "./pages/sign-up.page/sign-up.page.component";
import {DashboardPageComponent} from "./pages/dashboard.page/dashboard.page.component";
import {FeedPageComponent} from "./pages/feed.page/feed.page.component";
import {HomePageComponent} from "./pages/home.page/home.page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'feed', component: FeedPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
