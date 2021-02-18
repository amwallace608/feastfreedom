import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuItem } from '../models/menuItem';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  //define api url endpoint
  private _url: string = 'http://localhost:8080/';

  //constructor
  constructor(private http: HttpClient) {}

  //get current number of menu items in DB
  getNumItems(): Observable<number> {
    return this.http
      .get<number>(this._url + 'items')
      .pipe(catchError(this.errorHandler));
  }

  //error handler function
  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || 'Server Error');
  }
}
