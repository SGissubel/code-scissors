import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FooterService } from '../../home-page/footer.service';
import { PopUpMessageService } from 'src/app/shared/pop-up-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../login-signup.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private footerService: FooterService,
    private popUpMessageService: PopUpMessageService
  ) { }

  ngOnInit() {
    this.footerService.homePageCheck();
  }

  onLoginSubmit(form: NgForm) {
    this.authService.userSignin(form.value)
      .then(_ => {})
      .catch(error => {
          this.popUpMessageService.showSnackbar(error.message, null, 3000);
      });
  }

}
