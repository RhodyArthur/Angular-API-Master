import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientServiceService {

  private jsonUrl: string = 'https://jsonplaceholder.typicode.com/todos/'

  // inject httpClient Service
  constructor(private http: HttpClient) { }


  // get data
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.jsonUrl)
    // error handling
    .pipe(
      catchError(err => {
        return throwError('An error occured')
      })
    );
  }
}
