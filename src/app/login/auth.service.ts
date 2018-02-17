import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UIService } from '../shared/ui.service';

import { IUser } from '../dashboard/models/user.model';
import { IAuthData } from '../dashboard/models/user.model';

@Injectable()
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  error = new Subject<any>();
  private user: IUser;
  private isAuthenticated: boolean;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UIService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.isLoggedIn.next(true);
        this.router.navigate(['/dashboard']);
      } else {
        this.isAuthenticated = false;
        this.isLoggedIn.next(false);
        this.router.navigate(['']);
      }
    });
  }

  registerUser(authData: IAuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {

    })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  userSignin(authData: IAuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
    })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  userSignout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
