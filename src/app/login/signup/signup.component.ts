import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  displayError: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.error
      .subscribe(
        error => {
          this.displayError = error;  // not doing as intended?
        }
      );
  }

  onSignup(signUpForm: NgForm) {
    this.authService.registerUser(signUpForm.value);
  }

}
