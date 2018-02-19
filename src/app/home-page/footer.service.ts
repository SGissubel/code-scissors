import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class FooterService {
  isNotOnHomePage = new Subject<boolean>();

  constructor(private location: PlatformLocation) {}

  homePageCheck() {
    const isNotOnHomePage = this.location.location.href.indexOf('signup') !== -1
      || this.location.location.href.indexOf('login') !== -1;
    debugger;

    if (isNotOnHomePage) {
      this.isNotOnHomePage.next(true);
    } else {
      this.isNotOnHomePage.next(false);
    }
  }

}
