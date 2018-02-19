import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  isNotLoginRoute: boolean = false;

  constructor(private location: PlatformLocation) { }

  ngOnInit() {
    if (this.location.location.href.indexOf('signup') !== -1) {
      this.isNotLoginRoute = true;
    } 
  }

}