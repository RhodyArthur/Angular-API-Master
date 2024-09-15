import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // add mock authentication to all outgoing requests
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer mock-token')
  });

  // log requests
  console.log('HTTP Request:', authReq);

  return next(authReq)
  .pipe(
    // logs all http requests and responses
    tap({
      next: event =>  {
        if(event.type === HttpEventType.Response) {
          console.log(req.url, 'returned response with status ', event.status)
        }
      },

      // logs error 
      error: (error: HttpErrorResponse) => {
        console.error('HTTP Error', error);
      }
    }),

         
    catchError((err: HttpErrorResponse) => {
      return throwError(() => new Error(err.message))
    })


  );
};
