import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from '@angular/fire/auth';

import { IAuthData } from '../dashboard/models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  error = new Subject<any>();
  userID: string;
  private isAuthenticated: boolean;

  constructor(
    // private angularFireAuth: AngularFireAuth,
    // private auth: Auth,
    private router: Router
  ) { }

  // initAuthListener() {
  //   this.angularFireAuth.authState.subscribe(user => {
  //     if (user) {
  //       this.userID = user.uid;
  //       this.isAuthenticated = true;
  //       this.isLoggedIn.next(true);
  //       this.router.navigate(['/dashboard']);
  //     } else {
  //       this.isAuthenticated = false;
  //       this.isLoggedIn.next(false);
  //       this.router.navigate(['']);
  //     }
  //   });
  // }

  // getUserID() {
  //   return this.userID;
  // }

  // registerUser(authData: IAuthData) {
  //   return createUserWithEmailAndPassword(
  //     this.auth,
  //     authData.email,
  //     authData.password
  //   );
  // }

  // userSignin(authData: IAuthData) {
  //   return signInWithEmailAndPassword(
  //     this.auth,
  //     authData.email,
  //     authData.password
  //   );
  // }

  // userSignout() {
  //   signOut(this.auth);
  // }

  isAuth() {
    return this.isAuthenticated;
  }

}
