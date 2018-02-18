import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';
import { UserDataService } from '../dashboard/services/userData.service';

import { IUser } from '../dashboard/models/user.model';
import { IAuthData, IScreenName } from '../dashboard/models/user.model';

@Injectable()
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  error = new Subject<any>();
  userID: string;
  private user: IUser;
  private isAuthenticated: boolean;
  authSubscription: Subscription;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private uiService: UIService,
              private userData: UserDataService) { }

  initAuthListener() {
    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        this.isAuthenticated = true;
        this.isLoggedIn.next(true);
        this.onAuth();
        this.router.navigate(['/dashboard']);
      } else {
        this.isAuthenticated = false;
        this.isLoggedIn.next(false);
        this.router.navigate(['']);
      }
    });
  }

  getUserID() {
    return this.userID;
  }

  registerUser(authData: IAuthData, screenname: IScreenName) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.userData.storeScreenName(screenname, this.userID);
    })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  onAuth() {
    this.userData.getUserInfo(this.userID);
  }


  userSignin(authData: IAuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.onAuth();
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

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

}
