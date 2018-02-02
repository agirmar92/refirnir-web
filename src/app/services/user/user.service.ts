import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { UserProfile } from '../../models/user-profile';

@Injectable()
export class UserService {

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  updateUserProfile(user: UserProfile): Promise<any> {
    return this.afDatabase.object(`userProfile/${user.uid}`).update(user);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.afDatabase.object(`userProfile/${userId}`).valueChanges();
  }

}
