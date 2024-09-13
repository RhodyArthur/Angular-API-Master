import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Data } from '../interface/data';

@Injectable({
  providedIn: 'root'
})
export class ApiClientServiceService {

  private jsonUrl: string = 'https://jsonplaceholder.typicode.com/posts/'

  // inject httpClient Service
  constructor(private http: HttpClient) { }


  // get posts
  // getPosts(): Observable<Data[]> {
  //   return this.http.get<Data[]>(this.jsonUrl)
  //   // error handling
  //   .pipe(
  //     catchError(err => {
  //       return throwError('An error occured')
  //     })
  //   );
  // }
  getPosts(page:number, pageSize:number): Observable<Data[]> {
    // Constructing the query parameters for pagination
    let params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
 
    return this.http.get<Data[]>(this.jsonUrl, {params})
    // error handling
    .pipe(
      catchError(err => {
        return throwError('An error occured')
      })
    );
  }


  // create post
  createPost(body: Data) {
    return this.http.post<Data>(this.jsonUrl, body);
  }
}
