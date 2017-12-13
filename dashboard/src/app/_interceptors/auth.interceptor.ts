import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted');

    req = req.clone({
      withCredentials: true,
      // setHeaders: {
      // //   'accept': 'application/json',
      // //   'content-type': 'application/json',
      //   'username': 'redecorp\\eziof'
      // },
      // withCredentials: true,
      // headers: new HttpHeaders({ 'username': 'redecorp\\eziof' })
    });

    return next.handle(req);
  }
}
