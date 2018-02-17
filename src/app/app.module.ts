import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

// directives / services / pipes
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthService } from './login/auth.service';
import { UserDataService } from './dashboard/services/userData.sevice';
import { UIService } from './shared/ui.service';


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
    MonacoEditorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'code-scissors'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DashboardModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule
    ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UserDataService, AuthService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
