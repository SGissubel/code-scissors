import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopUpMessageService } from 'src/app/shared/pop-up-message.service';

import { FooterService } from '../../home-page/footer.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss',
    '../login-signup.component.scss'
  ]
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private footerService: FooterService,
    private popUpMessageService: PopUpMessageService
  ) { }

  ngOnInit() {
    this.footerService.homePageCheck();
  }

  onSignup(signUpForm: NgForm) {
    const emailPass = {
      email: signUpForm.value.email,
      password: signUpForm.value.password
    };
    // this.authService.registerUser(emailPass)
    //   .then(_ => {})
    //   .catch(error => {
    //     this.popUpMessageService.showSnackbar(error.message, null, 3000);
    //   });
  }

}

