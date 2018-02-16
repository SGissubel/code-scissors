import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { IUser } from '../dashboard/models/user.model';
import { IAuthData } from '../dashboard/models/user.model';

@Injectable()
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  private user: IUser;
  private isAuthenticated: boolean;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  registerUser(authData: IAuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.authSuccessful();
    })
      .catch(error => {
        console.log(error); //add an error show
      });
    // { look for this !!! in error
    //   "error": {
    //     "errors": [
    //       {
    //         "domain": "global",
    //         "reason": "invalid",
    //         "message": "EMAIL_EXISTS"
    //       }
    //     ],
    //       "code": 400,
    //         "message": "EMAIL_EXISTS"
    //   }
    // }
    
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
        console.log(error); //add an error show
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
