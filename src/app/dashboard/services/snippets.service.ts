import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { Router } from '@angular/router';

import { ISnippet } from '../models/snippets.model';
import { AuthService } from '../../login/auth.service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {
  snippetsAdded = new BehaviorSubject<any[]>(null);
  snippetsExist = new BehaviorSubject<boolean>(null);
  snippetsAll: any[] = [];
  garbage: Observable<any[]>;
  userID: string;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
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
      .snapshotChanges().pipe(
        map(results => {
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
      )
      .subscribe(result => {
        this.snippetsAll.push(result);

        if (result) {
          this.snippetsExist.next(true);
        }

        this.setSnippetsAdded();
      });
  }

  getSnippetsExist() {
    return this.snippetsExist.asObservable();
  }

  setSnippetsAdded() {
    this.snippetsAdded.next(this.snippetsAll);  
  }

  getSnippetsAdded() {
    return this.snippetsAdded.asObservable();
  }

  updateSnippet(snippet: ISnippet) {
    const selectedSnip = snippet.id;
    this.db.doc<any>(`snippets/${this.userID}/user-snippets/${selectedSnip}`)
      .update(snippet);
    this.returnToDash();
  }

  deleteSnippet(snippet: ISnippet) {
    const that = this;
    this.db.collection('snippets')
      .doc(this.userID)
      .collection('user-snippets')
      .doc(snippet.id)
      .delete().then(function() {
        that.fetchCreatedSnippets();
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }

  private storeNewSnippet(snippet: ISnippet) {
    const itemId = this.db.createId();
    const createdAt = serverTimestamp();
    const item = { ...snippet, id: itemId, created_at: createdAt};
    
    this.db.collection('snippets')
      .doc(this.userID)
      .collection('user-snippets')
      .add(item);

    if (!snippet.private) {
      this.storePublicSnippet(snippet);
    } else {
      this.returnToDash();
    }
  }

  private storePublicSnippet(snippet: ISnippet) {
    this.db.collection('snippets').doc('public_snippets').collection('snippets').add(snippet);
    this.returnToDash();
  }

  returnToDash() {
    this.router.navigate(['dashboard']);
  }

}


