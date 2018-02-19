import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class FooterService {
  isNotOnHomePage = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
    private router: Router) {}

  homePageCheck() {
    const isNotOnHomePage = this.router.url.indexOf('signup') !== -1
      || this.router.url.indexOf('login') !== -1 || this.router.url.indexOf('dashboard') !== -1
      || this.router.url.indexOf('user') !== -1 || this.router.url.indexOf('edit') !== -1
      || this.router.url.indexOf('new') !== -1;

    if (isNotOnHomePage) {
      this.isNotOnHomePage.next(true);
    } else {
      this.isNotOnHomePage.next(false);
    }
  }

}
