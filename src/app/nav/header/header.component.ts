import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn
      .subscribe(
        authStatus => {
          this.isAuth = authStatus;
        }
      );
  }

  onLogOut() {
    this.authService.userSignout();
  }

}
