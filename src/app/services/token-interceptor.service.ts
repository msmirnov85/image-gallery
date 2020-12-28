import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(this.injectToken(request))
      .pipe(
        catchError(async (error: HttpErrorResponse) => {
          if (error.status === 401) {
            await this.authService.refreshToken();
            return next.handle(this.injectToken(request)).toPromise();
          }

          throw error;
        }))
  }

  injectToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.token}`
      }
    });
  }

}
