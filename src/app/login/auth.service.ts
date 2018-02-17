import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { IUser } from '../dashboard/models/user.model';
import { IAuthData } from '../dashboard/models/user.model';

@Injectable()
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  error = new Subject<any>();
  private user: IUser;
  private isAuthenticated: boolean;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  registerUser(authData: IAuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.authSuccessful();
    })
      .catch(error => {
        this.error = error; // add an error show
      });
  }

  userSignin(authData: IAuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.authSuccessful();
    })
      .catch(error => {
        console.log(error); // add an error show
      });
  }

  userSignout() {
    this.isAuthenticated = false;
    this.afAuth.auth.signOut();
    this.isLoggedIn.next(false);
    this.router.navigate(['']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  authSuccessful() {
    this.isAuthenticated = true;
    this.isLoggedIn.next(true);
    this.router.navigate(['/dashboard']);
  }

}
