import { Injectable } from '@angular/core';

@Injectable()
export class SnippetDataService {
  snippet = {};


  constructor() {}

  passSnippet(snippet) {
    this.snippet = snippet;
  }

  getSnippet() {
    if(Object.keys(this.snippet).length) {
      return this.snippet;
    } else {
      return null;
    }
  }

  clear() {
    this.snippet = {};
  }
}