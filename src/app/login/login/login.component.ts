import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FooterService } from '../../home-page/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../login-signup.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private footerService: FooterService) { }

  ngOnInit() {
    this.footerService.homePageCheck();
  }

  onLoginSubmit(form: NgForm) {
    this.authService.userSignin(form.value);
  }

}
