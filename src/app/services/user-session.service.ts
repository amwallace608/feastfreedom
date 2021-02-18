import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private _loggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private _currentUser: ReplaySubject<User> = new ReplaySubject<User>();

  //get user object passed to logUserIn, and set currentUser to it
  public logUserIn(user: User) {
    this._currentUser.next(user);
    this._loggedIn.next(true);
  }

  //reset currentUser
  public logUserOut() {
    this._currentUser.next(null);
    this._loggedIn.next(false);
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  public getCurrentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }
}
