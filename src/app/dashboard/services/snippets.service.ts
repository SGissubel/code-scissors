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
  snippetsAdded = new Subject<any[]>();
  snippetsExist = new Subject<boolean>();
  snippetsAll: any[] = [];
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
    this.snippetsAll = [];
    this.db
      .collection('snippets')
      .doc(this.userID)
      .collection('user-snippets')
      .snapshotChanges()
      .map(results => {
        return results.map((snippet) => {
          return {
            id: snippet.payload.doc.id,
              name: snippet.payload.doc.data().name,
              code: snippet.payload.doc.data().code,
              other_tags: snippet.payload.doc.data().other_tags,
              created_at: snippet.payload.doc.data().created_at,
              language: snippet.payload.doc.data().language,
              isprivate: snippet.payload.doc.data().private,
              favorite: snippet.payload.doc.data().favorite
            };
        });
      })
      .subscribe(result => {
        this.snippetsAll.push(result);
        if (result) this.snippetsExist.next(true);
        this.snippetsAdded.next(this.snippetsAll);
      });



     // the code below is working (just not what I need -- the above code will fetch me the specific id for accessing each stored "snippet")
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


