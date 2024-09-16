import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, retry, switchMap, tap, throwError } from 'rxjs';
import { Data } from '../interface/data';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment.dev';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClientServiceService {

  // api url
  private jsonUrl = environment.apiUrl;
  private totalPosts:number = 0;

  // inject httpClient Service
  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlingService,
              private storageService: StorageService
  ) { }


  // fetching all posts
  getPosts(page: number = 1, pageSize: number = 10): Observable<Data[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString());
  
    return this.http.get<Data[]>(this.jsonUrl, { params })
      .pipe(
        retry(2),
        catchError(err => this.errorHandler.handleError(err)),
        // Update storage service after successful API call (optional)
        tap(apiPosts => {
          this.storageService.savePostsToLocalStorage(apiPosts);
          this.storageService.postsSubject.next(apiPosts)
        })
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
      catchError(err => this.errorHandler.handleError(err)),
      tap(newPost => this.storageService.addPostToLocalStorage(newPost))
    );
  }


  // update post
  updatePost(body: Data) {
    return this.http.put<Data>(`${this.jsonUrl}/${body.id}`, body)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err)),
      tap(updatedPost => this.storageService.updatePostInLocalStorage(updatedPost))
    );
  }

  // delete post
  deletePost(id: number) {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err)),
      tap(() => this.storageService.removePostFromLocalStorage(id))
    );
  }




}
