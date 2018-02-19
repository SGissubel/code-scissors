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
}
