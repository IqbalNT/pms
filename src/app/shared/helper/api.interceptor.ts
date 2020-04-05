import { Injectable, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
// import { IContainer } from '../models/api-container.model';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  serverToken: string;
  constructor(@Inject("BASE_API_URL") private baseUrl: string) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log(this.accessToken,"????????????????????????????????????");

    // request = request.clone({
    //   headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
    // });

    request = request.clone({ url: `${this.baseUrl}${request.url}` });
    request = request.clone({
      headers: request.headers.set("Content-Type", "application/json")
    });
    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });
    return next.handle(request).pipe(
      retry(1),
      // map(response => {
      //   return response.isExecuted && response.data ? response.data: null;
      // }),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {

        //   // refresh token
        // } else {
        //   return throwError(error);
        // }
        return throwError(error);
      })
    );
  }

  // get apiAccessToken() {
  //   return this.authService.getAccessToken();
  // }
}
