import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SnippetDataService {
  // snippet = new Subject<any>();
  snippet = {};


  constructor() {}

  passSnippet(snippet) {
    this.snippet = snippet;
  }

  getSnippet() {
    return this.snippet;
  }

  clear() {
  }
}