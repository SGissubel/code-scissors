import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FooterService } from './home-page/footer.service';

import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = false;
  notOnHomePage = false;

  constructor(private authService: AuthService,
              private footServ: FooterService) { }

  ngOnInit() {
    this.authService.initAuthListener(); 
    this.footServ.isNotOnHomePage
      .subscribe(
        (bool) => {
          debugger;
          this.notOnHomePage = bool;
        }
      );
    this.authService.isLoggedIn
      .subscribe(
      authStatus => {
        this.isAuth = authStatus;
        }
      );
  }

  // setFooter() {
  //   const isNotOnHomePage = this.location.location.href.indexOf('signup') !== -1
  //     || this.location.location.href.indexOf('login') !== -1
  //     || this.isAuth === true;

  //   if (isNotOnHomePage) {
  //     this.notOnHomePage = true;
  //   }
  // }
}
