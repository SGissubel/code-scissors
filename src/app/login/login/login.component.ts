import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FooterService } from '../../home-page/footer.service';
import { PopUpMessageService } from 'src/app/shared/pop-up-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../login-signup.component.scss'
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private footerService: FooterService,
    private popUpMessageService: PopUpMessageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.footerService.homePageCheck();
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: null,
      password: null
    });
  }

  loginSubmit() {
    const form = this.loginForm.value;

    this.authService.userSignin(form)
      .then(_ =>
        this.router.navigate(['dashboard'])
      )
      .catch(error => {
          this.popUpMessageService.showSnackbar(error.message, null, 3000);
      });
  }

}
