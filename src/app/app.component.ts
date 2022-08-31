import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { FooterService } from './home-page/footer.service';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  isAuth: boolean = false;
  notOnHomePage: boolean = false;

  constructor(
    private authService: AuthService,
    private footServ: FooterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.initAuthListener();

    this.footServ.getIsNotOnHomePage()
      .subscribe({
        next: (isNotOnHomePage) => {
          this.notOnHomePage = isNotOnHomePage;
          console.clear();  
        },
        error: (err) => console.log(err)
      });

    this.authService.isLoggedIn
      .subscribe({
        next: (authStatus: boolean) => {
          this.isAuth = authStatus;
        },
        error: (err) => console.log(err)
      });
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
