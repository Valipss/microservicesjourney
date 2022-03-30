import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login.page/login.page.component";
import {SignUpPageComponent} from "./pages/sign-up.page/sign-up.page.component";
import {DashboardPageComponent} from "./pages/dashboard.page/dashboard.page.component";
import {FeedPageComponent} from "./pages/feed.page/feed.page.component";
import {HomePageComponent} from "./pages/home.page/home.page.component";
import {PostPageComponent} from "./pages/post.page/post.page.component";
import {IsLoggedGuard} from "./guards/is-logged.guard";
import {RedirectIfLogged} from "./guards/redirect-if-logged";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent, canActivate:[RedirectIfLogged] },
  { path: 'sign-up', component: SignUpPageComponent, canActivate:[RedirectIfLogged] },
  { path: 'feed', component: FeedPageComponent, canActivate:[IsLoggedGuard] },
  { path: 'dashboard', component: DashboardPageComponent, canActivate:[IsLoggedGuard] },
  {
    path: 'post',
    children: [
      {
        path: ':id',
        component: PostPageComponent,
      },
      {
        path: 'edit/:id',
        component: PostPageComponent,
        canActivate:[IsLoggedGuard]
      }
    ],
  },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
