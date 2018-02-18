import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ISnippet } from '../models/snippets.model';
import { AuthService } from '../../login/auth.service';

@Injectable()
export class SnippetsService {
  snippetsAdded = new Subject<ISnippet[]>();
  userID: string;

  constructor(private db: AngularFirestore,
              private router: Router,
              private authService: AuthService) {
    this.authService.userID
      .subscribe(
        (id) => {
          this.userID = id;
        }
      );
      debugger;
  }

  fetchAvailableSnippets() {
  }

  createdNewSnippet(snippet: ISnippet) {
    this.storeNewSnippet(snippet);
  }

  fetchCreatedSnippets() {
    this.db
      .collection('snippets')
      .valueChanges()
      .subscribe((snippets: ISnippet[]) => {
        this.snippetsAdded.next(snippets);
      });
  }

  private storeNewSnippet(snippet: ISnippet) {
    const itemId = this.db.createId();
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const itemDoc = this.db.doc('snippets');
    const userDoc = this.db.doc(this.userID);
    const item = { ...snippet, id: itemId, created_at: createdAt};
    this.db.collection('snippets').doc(this.userID).collection('user-snippets').add(item);
    this.router.navigate(['dashboard']);
  }

}
