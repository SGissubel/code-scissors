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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(signUpForm: NgForm) {
    this.authService.registerUser(signUpForm.value);
  }

}
