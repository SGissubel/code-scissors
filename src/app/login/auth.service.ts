import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
// import { store }
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore } from 'angularfire2/firestore';
import { PopUpMessageService } from '../shared/pop-up-message.service';

import { IUser } from '../dashboard/models/user.model';
import { IAuthData } from '../dashboard/models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  error = new Subject<any>();
  userID: string;
  private user: IUser;
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private angularFireAuth: Auth,
    // private afAuth: AngularFireAuth,
    // private db: AngularFirestore,
    private popUpMessage: PopUpMessageService
  ) { }

  initAuthListener() {
    this.angularFireAuth.onAuthStateChanged
    // this.angularFireAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userID = user.uid;
    //     this.isAuthenticated = true;
    //     this.isLoggedIn.next(true);
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.isAuthenticated = false;
    //     this.isLoggedIn.next(false);
    //     this.router.navigate(['']);
    //   }
    // });
  }

  getUserID() {
    return this.userID;
  }

  registerUser(authData: IAuthData) {
    // this.afAuth.auth.createUserWithEmailAndPassword(
    //   authData.email,
    //   authData.password
    // ).then(result => {

    // })
    //   .catch(error => {
    //     this.popUpMessage.showSnackbar(error.message, null, 3000);
    //   });
  }

  userSignin(authData: IAuthData) {
    // this.afAuth.auth.signInWithEmailAndPassword(
    //   authData.email,
    //   authData.password
    // ).then(result => {

    // })
    //   .catch(error => {
    //     this.popUpMessage.showSnackbar(error.message, null, 3000);
    //   });
  }

  userSignout() {
    // this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
