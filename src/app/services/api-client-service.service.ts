import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Data } from '../interface/data';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiClientServiceService {

  private jsonUrl = environment.apiUrl;

  // inject httpClient Service
  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlingService
  ) { }

  // fetching all posts
  getPosts(page:number = 1, pageSize:number = 10): Observable<Data[]> {
    // Constructing the query parameters for pagination
    const params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', pageSize.toString());
 
    return this.http.get<Data[]>(this.jsonUrl, {params})
    // error handling
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err))
    );
  }


  // retrieve a single post by id
  getPostById(id:number): Observable<Data> {
    return this.http.get<Data>(`${this.jsonUrl}${id}`)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err))
    )
  }


  // create post
  createPost(body: Data) {
    return this.http.post<Data>(this.jsonUrl, body)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err))
    );
  }


  // update post
  updatePost(body: Data) {
    return this.http.put<Data>(`${this.jsonUrl}/${body.id}`, body)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err))
    );
  }

  // delete post
  deletePost(id: number) {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err))
    );
  }




}
