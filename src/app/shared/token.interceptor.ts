// Http Requests und Responses abfangen und behandeln
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private fakeAuthToken = '1234567890';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const copiedRequest = request.clone({setHeaders: {
        Authorization: `Bearer ${this.fakeAuthToken}`
      }});
    return next.handle(copiedRequest);
  }
}
