import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSignupComponent } from './login/login-signup.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './login/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginSignupComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
  ]},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    DashboardRoutingModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}