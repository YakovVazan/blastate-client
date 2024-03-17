import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import consts from '../utils/constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.needsToken(request.url)) {
      return next.handle(request);
    }
    const token = localStorage.getItem('token');
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(authRequest);
  }

  needsToken(url: string): boolean {
    const isMyDomain = url.startsWith(consts.API_BASE_URL);
    const isLogin = url.includes('login');
    const isRegister = url.includes('register');

    return isMyDomain && !isLogin && !isRegister;
  }
}
