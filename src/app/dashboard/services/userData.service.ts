import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { IScreenName } from './models/user.model';

interface Username {
  screen_name: string;
}


@Injectable()
export class UserDataService {
  userInfo = new Subject<any>();
  userthings: Observable<Username>;
  userthings2: Observable<Username>;
  userstuff: AngularFirestoreCollection<Username>;

  constructor(private db: AngularFirestore) {}

  storeScreenName(screenname: IScreenName, id: string) {
    debugger;
    this.db.collection('users')
    .doc(id)
    .set(screenname);
  }

  getUserInfo(id: string) {

    this.db
      .collection('users')
      .doc(id)
      .ref
      .get()
      .then((user: any) => {
        this.userInfo.next(user);
           debugger;
      });

     this.userthings = this.db
      .collection('users')
      .doc(id).valueChanges();
      console.log(this.userthings);
      
   this.db
      .collection('users')
      .doc(id).snapshotChanges().subscribe(
        (result) => {
          console.log(result)
        }
        );

      

   
      // .subscribe((user: any) => {
      //   this.userInfo.next(user);
      // });
  }

}
