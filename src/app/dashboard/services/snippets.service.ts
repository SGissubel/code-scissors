import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ISnippet } from '../models/snippets.model';
import { AuthService } from '../../login/auth.service';

@Injectable()
export class SnippetsService {
  snippetsAdded = new Subject<ISnippet[]>();
  snippetsExist = new Subject<boolean>();
  garbage: Observable<any[]>;
  userID: string;

  constructor(private db: AngularFirestore,
              private router: Router,
              private authService: AuthService) {
    this.userID = this.authService.getUserID();
  }

  fetchAvailableSnippets() {
  }

  createdNewSnippet(snippet: ISnippet) {
    this.storeNewSnippet(snippet);
  }

  fetchCreatedSnippets() {

    // this.snipObserve = thing.snapshotChanges()
    //  .map(result => {
    //    return result.map(doc => {
    //      const data = doc.payload.doc.data as ISnippet;
    //      const id = doc.paylod.doc.id;
    //      return { id, ...data}
    //    })
    //    }
    //  });

    this.db
      .collection('snippets')
      .doc(this.userID)
      .collection<any>('user-snippets')
      .snapshotChanges()
      .map(results => {
        return results.map((doc) => {
          console.log(doc)
        });
      });
      //this code below - I assume - I would need to subscribe to recieve all newly created items
      // .subscribe(result => {
      //   for (const res of result) {
      //     console.log(res.payload.doc.data());
      //   }
      // });



      //the code below is working (just not what I need -- the above code will fetch me the specific id for accessing each stored "snippet")
    // this.db
    //   .collection('snippets')
    //   .doc(this.userID)
    //   .collection('user-snippets')
    //   .valueChanges()
    //   .subscribe((snippets: ISnippet[]) => {
    //     this.snippetsAdded.next(snippets);
    //     if (snippets.length) this.snippetsExist.next(true);
    //   }, error => {
    //     // console.log(error);
    //   });
  }

  updateSnippet(snippet: ISnippet) {
    const selectedSnip = snippet.id;
    this.db.doc<any>(`snippets/${this.userID}/user-snippets/${selectedSnip}`)
      .update(snippet);
  }

  private storeNewSnippet(snippet: ISnippet) {
    const itemId = this.db.createId();
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const item = { ...snippet, id: itemId, created_at: createdAt};
    this.db.collection('snippets').doc(this.userID).collection('user-snippets').add(item);
    if (!snippet.private) this.storePublicSnippet(snippet);
    else this.router.navigate(['dashboard']);
  }

  private storePublicSnippet(snippet: ISnippet) {
    this.db.collection('snippets').doc('public_snippets').collection('snippets').add(snippet);
    this.router.navigate(['dashboard']);
  }

}


