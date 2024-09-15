import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Comment } from '../interface/data';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  // api url
  private apiUrl:string = 'https://jsonplaceholder.typicode.com/comments/'
  constructor(private http: HttpClient) { }

  // retrieve comments data
  getComments(page:number = 1, pageSize:number = 3): Observable<Comment[]> {
    // Constructing the query parameters for pagination
    const params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', pageSize.toString());
    
    return this.http.get<Comment[]>(this.apiUrl, {params})
    .pipe(catchError(err => {
      return throwError('Unable to fetch comments')
    }));
  }


  // retrieve comments for a post
  getPostComments(postId:number, page:number = 1, pageSize:number = 5): Observable<Comment[]> {
    // Constructing the query parameters for pagination
    const params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', pageSize.toString());

    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`, {params})
    .pipe(catchError(err => {
      return throwError('Unable to fetch comments')
    }));
  }
}
