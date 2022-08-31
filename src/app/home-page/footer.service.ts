import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  isNotOnHomePage$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
  ) {}

  homePageCheck() {
    const isNotOnHomePage = 
      this.router.url.indexOf('signup') !== -1 ||
      this.router.url.indexOf('login') !== -1 ||
      this.router.url.indexOf('dashboard') !== -1 ||
      this.router.url.indexOf('user') !== -1 ||
      this.router.url.indexOf('edit') !== -1 ||
      this.router.url.indexOf('new') !== -1;

    if (isNotOnHomePage) {
      this.isNotOnHomePage$.next(true);
    } else {
      this.isNotOnHomePage$.next(false);
    }
  }

  getIsNotOnHomePage() {
    return this.isNotOnHomePage$.asObservable();
  }

}
