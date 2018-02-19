import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private footerService: FooterService) { }

  ngOnInit() {
    this.footerService.homePageCheck();
  }

  onSignup(signUpForm: NgForm) {
    const emailPass = {
      email: signUpForm.value.email,
      password: signUpForm.value.password
    };
    this.authService.registerUser(emailPass);
  }



}

