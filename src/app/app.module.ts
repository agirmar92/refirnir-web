import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatCardModule,
  MatTooltipModule
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AgmCoreModule } from '@agm/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { EventService } from './services/event/event.service';

import { SpinnerComponent } from './components/spinner/spinner.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    SpinnerComponent
  ],
  imports: [
    // Routes config
    RouterModule.forRoot(
      [
        {
          path: 'events',
          component: EventsComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: '',
          redirectTo: '/events',
          pathMatch: 'full'
        }
      ],
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqkAVfy5ksnE5bpmpTsTMTPFyySwfK7hk'
    }),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatTooltipModule
  ],
  providers: [
    AuthService,
    UserService,
    EventService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
