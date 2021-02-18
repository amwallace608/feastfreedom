import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kitchen } from '../models/kitchen';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {
  //define api url endpoint
  private _url: string = 'http://localhost:8080/';

  //constructor
  constructor(private http: HttpClient) {}

  //get kitchens from API
  getKitchens(): Observable<Kitchen[]> {
    return this.http
      .get<Kitchen[]>(this._url + 'kitchens')
      .pipe(catchError(this.errorHandler));
  }

  //get kitchen by ID from API
  getKitchen(id): Observable<Kitchen> {
    return this.http
      .get<Kitchen>(this._url + 'kitchens/' + id)
      .pipe(catchError(this.errorHandler));
  }

  //add Kitchen to db
  registerKitchen(kitchen: Kitchen): Observable<Kitchen> {
    return this.http
      .post<Kitchen>(this._url + 'kitchens', kitchen)
      .pipe(catchError(this.errorHandler));
  }

  //error handler function
  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || 'Server Error');
  }
}
