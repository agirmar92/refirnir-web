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


@Injectable()
export class EventService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private userService: UserService,
    private authService: AuthService
  ) { }

  getAllEvents() {
    return this.afDatabase.list('events')
      .valueChanges()
      .map(events => {
        events.forEach((event: Event) => {
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

          if (signedUp) {
            event.signedUpDetails = signedUp.map(x => Object.assign({}, x));
            signedUp.forEach((signUp, i) => {
              this.userService.getUserProfile(signUp.player).subscribe(playerProfile => {
                const currSignUpDetails = event.signedUpDetails[i];
                currSignUpDetails.player = playerProfile;
              });
            });
          }
        });
        return events;
      });
  }

  signUp(event: Event) {
    const userId = this.authService.getUserId();
    const userIndex = event.signedUp.findIndex(signUp => signUp.player === userId);
    const locationRef = `events/${event.eventId}/signedUp`;

    if (userIndex !== -1) {
      event.signedUp[userIndex].active = true;
    } else {
      event.signedUp.push({ active: true, player: userId });
    }
    this.afDatabase.database.ref(locationRef).update(event.signedUp);
  }

  cancelSignUp(event: Event) {
    const userId = this.authService.getUserId();
    const userIndex = event.signedUp.findIndex(signUp => signUp.player === userId);
    const locationRef = `events/${event.eventId}/signedUp`;

    if (userIndex !== -1) {
      event.signedUp[userIndex].active = false;
      this.afDatabase.database.ref(locationRef).update(event.signedUp);
    }
  }

  getNumberOfActiveSignUps(event: Event): number {
    let count = 0;
    event.signedUpDetails.forEach(signUp => {
      if (signUp.active) { count++; }
    });
    return count;
  }

  getAvailableSpotsCount(event: Event): number {
    return event.maxPlayers - this.getNumberOfActiveSignUps(event);
  }

  alreadySignedUp(event: Event): boolean {
    const userId = this.authService.getUserId();
    return event.signedUp.some(signUp => signUp.player === userId && signUp.active === true);
  }

}
