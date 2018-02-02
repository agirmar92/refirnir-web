import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatTableDataSource } from '@angular/material';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { EventService } from '../../services/event/event.service';
import { UserProfile } from '../../models/user-profile';
import { Event } from '../../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  currentUser: firebase.User;
  loadingEvents = false;
  allEvents: Array<Event> = [];
  lat = 64.088466;
  lng = -21.927701;
  mapType = 'hybrid';
  zoom = 17;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService,
    private afDatabase: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => this.currentUser = user,
      error => console.log(error)
    );

    this.loadingEvents = true;

    // Listen for when new events are added.
    this.eventService.onNewEvents().subscribe(newEvent => {
      console.log(newEvent);
      const newEventObject: Event = this.eventService.buildEventObject(newEvent.payload.val());

      // Listen to event changes (signups and ...)
      this.eventService.onSignUpChange(`events/${newEventObject.eventId}/signedUp`)
        .subscribe(changedSignUp => {
          console.log(changedSignUp);
          this.eventService.refreshSignUpDetails(newEventObject, changedSignUp);
        });

      this.allEvents.push(newEventObject);
      this.loadingEvents = false;
    });

    // TODO: Listen to event deletion
  }

  getNumberOfActiveSignUps(event: Event): number {
    return this.eventService.getNumberOfActiveSignUps(event);
  }

  getAvailableSpotsCount(event: Event): number {
    return this.eventService.getAvailableSpotsCount(event);
  }

  alreadySignedUp(event: Event): boolean {
    return this.eventService.alreadySignedUp(event);
  }

  signUp(event: Event) {
    this.eventService.signUp(event);
  }

  cancelSignUp(event: Event) {
    this.eventService.cancelSignUp(event);
  }

}
