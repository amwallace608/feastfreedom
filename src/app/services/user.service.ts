import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  //post/save user to API/DB
  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(this._url, user)
      .pipe(catchError(this.errorHandler));
  }

  //get user from API/DB by email
  getUserByEmail(email): Observable<User> {
    return this.http
      .get<User>(this._url + '/' + email)
      .pipe(catchError(this.errorHandler));
  }

  //error handler function
  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || 'Server Error');
  }
}
