import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CacheService } from './services/cache.service';
import { Data } from './interface/data';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    
    // Check if request is in cache
    const cacheResponse = this.cacheService.get(req.urlWithParams);
    if (cacheResponse) {
      return of(new HttpResponse({ body: cacheResponse, status: 200 }));
    }
  
    // If not cached, proceed with request
    return next.handle(req).pipe(
      tap({
        next: event => {
        if (event.type === HttpEventType.Response) {
          // Cache the response
          this.cacheService.set(req.urlWithParams, event.body as Data);
        }
      }}),
      catchError(err => throwError(() => new Error(err.message)))
    );
  }
}
