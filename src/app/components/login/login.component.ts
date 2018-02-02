import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loggingIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginWithPassword() {
    this.loggingIn = true;

    this.authService.loginWithPassword(this.email, this.password).then(
      data => {
        this.router.navigate(['/events']);
        this.loggingIn = false;
      },
      error => {
        console.log(error);
        this.showErrorMessage(error.message);
        this.loggingIn = false;
      }
    );
  }

  loginWithGoogle() {
    this.loggingIn = true;

    this.authService.loginWithGoogle().then(
      data => {
        this.router.navigate(['/events']);
        this.loggingIn = false;
      },
      error => {
        console.log(error);
        this.showErrorMessage(error.message);
        this.loggingIn = false;
      }
    );
  }

  loginWithFacebook() {
    this.loggingIn = true;

    this.authService.loginWithFacebook().then(
      data => {
        this.router.navigate(['/events']);
        this.loggingIn = false;
      },
      error => {
        console.log(error);
        this.showErrorMessage(error.message);
        this.loggingIn = false;
      }
    );
  }

  showErrorMessage(error) {
    this.snackBar.open(error, 'Loka', {
      duration: 5000
    });
  }
}
