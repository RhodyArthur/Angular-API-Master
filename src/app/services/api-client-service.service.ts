import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Data } from '../interface/data';

@Injectable({
  providedIn: 'root'
})
export class ApiClientServiceService {

  private jsonUrl: string = 'https://jsonplaceholder.typicode.com/posts/'

  // inject httpClient Service
  constructor(private http: HttpClient) { }

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
      catchError(err => {
        return throwError('An error occured while fetching posts')
      })
    );
  }


  // retrieve a single post by id
  getPostById(id:number): Observable<Data> {
    return this.http.get<Data>(`${this.jsonUrl}${id}`)
    .pipe(
      retry(2),
      catchError(err => {
        return throwError('An error occured while fetching posts')
      })
    )
  }


  // create post
  createPost(body: Data) {
    return this.http.post<Data>(this.jsonUrl, body);
  }


  // update post
  updatePost(body: Data) {
    return this.http.put<Data>(`${this.jsonUrl}/${body.id}`, body)
  }

  // delete post
  deletePost(id: number) {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`)
  }

  // error handling
  private handleError() {
    let errorMessage = 'An error occurred while fetching data';
    return throwError(() => new Error(errorMessage))
  }


}
