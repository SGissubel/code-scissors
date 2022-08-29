import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';

import {
  AngularFireAnalyticsModule,
  APP_NAME,
  APP_VERSION,
  DEBUG_MODE as ANALYTICS_DEBUG_MODE,
  ScreenTrackingService,
  UserTrackingService,
  COLLECTION_ENABLED
} from '@angular/fire/compat/analytics';

import { AngularFireDatabaseModule, USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule, SERVICE_WORKER, VAPID_KEY } from '@angular/fire/compat/messaging';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { AngularFireRemoteConfigModule, SETTINGS as REMOTE_CONFIG_SETTINGS, DEFAULTS as REMOTE_CONFIG_DEFAULTS } from '@angular/fire/compat/remote-config';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/compat/performance';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

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
import { FooterHomeComponent } from './nav/footer/footer-home/footer-home.component';


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
    FooterHomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireRemoteConfigModule,
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    AngularFireFunctionsModule,
    AngularFirePerformanceModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    PerformanceMonitoringService,
    { provide: FIRESTORE_SETTINGS, useValue: { ignoreUndefinedProperties: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
