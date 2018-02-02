import { Injectable } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';

import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../../models/event';
import { EventComment } from '../../models/event-comment';
import { UserService } from '../user/user.service';
import { Observable } from '@firebase/util';
import { UserProfile } from '../../models/user-profile';
import { SignUp } from '../../models/sign-up';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PromptComponent } from '../../components/dialogs/prompt/prompt.component';


@Injectable()
export class EventService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  onNewEvents() {
    return this.afDatabase.list('events')
      .stateChanges(['child_added']);
  }

  onSignUpChange(databasePath) {
    console.log('subscribing', databasePath);
    return this.afDatabase.list(databasePath)
      .valueChanges();
  }

  buildEventObject(event) {
    const creatorId = event['creator'];
    const comments = event['comments'];
    const signedUp = event['signedUp'];

    if (creatorId) {
      this.userService.getUserProfile(creatorId).subscribe(creatorProfile => {
        event.creatorDetails = creatorProfile;
      });
    }

    if (comments) {
      event.commentsDetails = comments.map(x => Object.assign({}, x));
      comments.forEach((comment, i) => {
        this.userService.getUserProfile(comment.author).subscribe(authorProfile => {
          const currCommentDetails = event.commentsDetails[i];
          currCommentDetails.author = authorProfile;
        });
      });
    }

    return event;
  }

  refreshSignUpDetails(event, newSignedUp) {
    console.log('refreshing signups');
    event.signedUpDetails = newSignedUp.map(x => Object.assign({}, x));
    newSignedUp.forEach((signUp, i) => {
      this.userService.getUserProfile(signUp.player).subscribe(playerProfile => {
        const currSignUpDetails = event.signedUpDetails[i];
        currSignUpDetails.player = playerProfile;
      });
    });
  }

  signUp(event: Event) {
    // Initialize the signedUp array if non-existant
    if (!event.signedUp) {
      event.signedUp = [];
    }

    const userId = this.authService.getUserId();
    const userIndex = event.signedUp.findIndex(signUp => signUp.player === userId);
    const locationRef = `events/${event.eventId}/signedUp`;

    if (userIndex !== -1) {
      event.signedUp[userIndex].active = true;
    } else {
      event.signedUp.push({ active: true, player: userId });
    }
    this.afDatabase.database.ref(locationRef).update(event.signedUp).then(
      success => this.snackBar.open('Þú hefur verið skráður refur!', 'Loka', { duration: 2000 })
    );
  }

  cancelSignUp(event: Event) {
    const userId = this.authService.getUserId();
    const userIndex = event.signedUp.findIndex(signUp => signUp.player === userId);
    const locationRef = `events/${event.eventId}/signedUp`;

    if (userIndex !== -1) {
      const dialogRef = this.dialog.open(PromptComponent);
      dialogRef.afterClosed().subscribe(result => {
        // Only cancel the user's signup if he is sure
        if (result) {
          event.signedUp[userIndex].active = false;
          this.afDatabase.database.ref(locationRef).update(event.signedUp).then(
            success => this.snackBar.open('Þú hefur verið afskráður', 'Loka', { duration: 2000 })
          );
        }
      });
    }
  }

  getNumberOfActiveSignUps(event: Event): number {
    let count = 0;
    if (event.signedUpDetails) {
      event.signedUpDetails.forEach(signUp => {
        if (signUp.active) { count++; }
      });
    }
    return count;
  }

  getAvailableSpotsCount(event: Event): number {
    return event.maxPlayers - this.getNumberOfActiveSignUps(event);
  }

  alreadySignedUp(event: Event): boolean {
    const userId = this.authService.getUserId();
    return event.signedUp && event.signedUp.some(signUp => signUp.player === userId && signUp.active === true);
  }

  addNewEvent() {
    const locationRef = 'events';
    const newEventRef = this.afDatabase.list(locationRef).push(new Event(
      this.authService.getUserId(),
      '04/04/2020 04:03:35 AM',
      '04/04/2012 04:03:35 AM',
      10
    ));
  }

}
