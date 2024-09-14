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

  getPosts(page:number = 1, pageSize:number = 10): Observable<Data[]> {
    // Constructing the query parameters for pagination
    const params = new HttpParams()
    .set('_page', page.toString())
    .set('pageSize', pageSize.toString());
 
    return this.http.get<Data[]>(this.jsonUrl, {params})
    // error handling
    .pipe(
      catchError(err => {
        return throwError('An error occured while fetching posts')
      })
    );
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
}
