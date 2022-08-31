import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private footerService: FooterService,
    private popUpMessageService: PopUpMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.footerService.homePageCheck();
    this.initializeForm();
  }
  
  initializeForm() {
    this.signInForm = this.fb.group({
      email: null,
      password: null
    });
  }

  signinSubmit() {
    const signUpForm = this.signInForm.value;
    const emailPass = {
      email: signUpForm.email,
      password: signUpForm.password
    };
    this.authService.registerUser(emailPass)
      .then()
      .catch(error => {
        this.popUpMessageService.showSnackbar(error.message, null, 3000);
      });
  }

}

