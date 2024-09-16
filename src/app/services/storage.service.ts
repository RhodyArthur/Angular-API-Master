import { Injectable } from '@angular/core';
import { BehaviorSubject, retry, catchError } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { Data } from '../interface/data';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    // api url
    private jsonUrl = environment.apiUrl;
    
    // for state management
    public postsSubject = new BehaviorSubject<Data[]>([]);
    post$ = this.postsSubject.asObservable();
    private localStorageKey = 'posts';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlingService
  ) { 
    this.loadPostsFromLocalStorage();
    this.loadPostsFromApi();
  }

  // load posts from local storage
  loadPostsFromLocalStorage() {
    const posts = localStorage.getItem(this.localStorageKey);
    if(posts) {
      this.postsSubject.next(JSON.parse(posts));
    }
  }

  // load posts from API
  loadPostsFromApi() {
    this.http.get<Data[]>(this.jsonUrl)
    .pipe(
      retry(2),
      catchError(err => this.errorHandler.handleError(err))
    )
    .subscribe(posts => {
      this.postsSubject.next(posts);
      this.savePostsToLocalStorage(posts);
    })
  }

  savePostsToLocalStorage(posts: Data[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
  }

  addPostToLocalStorage(newPost: Data): void {
    const currentPosts = this.postsSubject.value;
    currentPosts.push(newPost);
    this.postsSubject.next(currentPosts);
    this.savePostsToLocalStorage(currentPosts);
  }

  updatePostInLocalStorage(updatedPost: Data): void {
    const currentPosts = this.postsSubject.value;
    const index = currentPosts.findIndex(p => p.id === updatedPost.id);
    if (index > -1) {
      currentPosts[index] = updatedPost;
      this.postsSubject.next(currentPosts);
      this.savePostsToLocalStorage(currentPosts);
    }

  }


  removePostFromLocalStorage(id: number): void {
    const currentPosts = this.postsSubject.value;
    const updatedPosts = currentPosts.filter(post => post.id !== id);
    this.postsSubject.next(updatedPosts);
    this.savePostsToLocalStorage(updatedPosts);
  }

    // Get the next unique ID
  getNextUniqueId(): number {
    const currentPosts = this.postsSubject.value;
    const maxId = currentPosts.reduce((max, post) => post.id > max ? post.id : max, 0);
    return maxId + 1; 
  }

}