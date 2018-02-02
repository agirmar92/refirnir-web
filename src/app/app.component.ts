import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { UserProfile } from './models/user-profile';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser: firebase.User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.currentUser = user;
        if (user) {
          const userProfile = new UserProfile(user.uid, user.displayName, user.photoURL);
          this.userService.updateUserProfile(userProfile);
        }
      },
      error => console.log(error)
    );
  }

  logout() {
    this.authService.logout().then(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserPhotoURL() {
    const userPhotoURL = this.currentUser ? this.currentUser.photoURL : undefined;
    return `url(${userPhotoURL})`;
  }

  getUserDisplayName() {
    const userDiplayName = this.currentUser ? this.currentUser.displayName : undefined;
    return userDiplayName;
  }

  getUserEmail() {
    const userEmail = this.currentUser ? this.currentUser.email : undefined;
    return userEmail;
  }
}
