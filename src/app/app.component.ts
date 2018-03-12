import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FooterService } from './home-page/footer.service';

import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  isAuth = false;
  notOnHomePage = false;

  constructor(private authService: AuthService,
              private footServ: FooterService,
              private router: Router) { }

  ngOnInit() {
    this.authService.initAuthListener();
    this.footServ.isNotOnHomePage
      .subscribe(
        (bool) => {
          this.notOnHomePage = bool;
          console.clear();
        },
        err => {
          // console.log(err)
        }
      );

    this.authService.isLoggedIn
      .subscribe(
      authStatus => {
        this.isAuth = authStatus;
        }
      );
  }

  ngAfterViewChecked() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
}
