import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SnippetDataService {
  snippet = new Subject<any>();

  constructor() {}

  passSnippet(snippet) {
    this.snippet.next(snippet);
  }
}