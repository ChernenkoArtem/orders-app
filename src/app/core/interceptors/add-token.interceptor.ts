import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('userToken');

    if (!authToken) {
      return next.handle(request);
    }
    const authorizedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return next.handle(authorizedRequest);
  }

}
