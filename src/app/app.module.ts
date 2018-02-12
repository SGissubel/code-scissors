import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './nav/header/header.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BodyComponent } from './home-page/body/body.component';
import { LoginSignupComponent } from './login/login-signup.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

// directives / services / pipes
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthService } from './login/auth.service';
import { UserDataService } from './dashboard/userData.sevice';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DropdownDirective,
    FooterComponent,
    HomePageComponent,
    BodyComponent,
    LoginSignupComponent,
    SignupComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DashboardModule,
    
    MDBBootstrapModule.forRoot(),
    ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UserDataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }