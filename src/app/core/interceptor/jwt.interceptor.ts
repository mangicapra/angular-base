import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, EMPTY } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { Refresh } from '../../module/auth/model/refresh';
import { LogService } from '@shared/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  constructor(private authService: AuthService, private logger: LogService) {}

  static addToken(req: HttpRequest<any>, tokenData: string): HttpRequest<any> {
    if (/refresh/.test(req.url) || /login/.test(req.url)) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenData}`
      }
    });
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      const REFRESH = this.authService.createRecord(Refresh);
      return REFRESH.save(
        {},
        new HttpHeaders({
          Authorization: `Bearer ${this.authService.getRefreshToken}`
        })
      ).pipe(
        tap((token) => {
          localStorage.setItem('token', token.accessToken);
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      );
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.authService.getToken) {
      request = JwtInterceptor.addToken(request, this.authService.getToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !/login/.test(request.url)) {
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = JwtInterceptor.addToken(request, this.authService.getToken);
              return next.handle(request);
            }),
            catchError((err: any) => {
              this.authService.logOut();
              return EMPTY;
            })
          );
        }
        this.logger.error('Error while making request', error.url, error.message, error.error);
        throw error;
      })
    );
  }
}
