import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Helper } from '../_helpers/helper';
import { User, IUser } from '../_models/index';

@Injectable()
export class AuthService {

  private static _user: User;

  constructor(
    private _router: Router,
    private _http: Http,
  ) { }

  login(username: string, password: string): Observable<Response> {
    return this._http
      .post(Helper.apiUrl('/authenticate'), { username, password })
      .map(Helper.extractData)
      .do((data: IUser) => {
        if (data && data.token) {
          this._setAuthenticate(data);
        }
      })
      .catch(Helper.handleError);
  }

  logout(): void {
    if (this.isAuthenticated) {
      this._setAuthenticate();
    }
  }

  get user() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this._createUser(user);
  }

  get isAuthenticated(): boolean {
    try {
      return !!this.user.token;
    } catch (e) {
      return false;
    }
  }

  private _createUser(user: IUser): User {
    try {
      if (!AuthService._user) {
        AuthService._user = new User(user.nome, user.perfil, user.login, user.token);
      }

      return AuthService._user;
    } catch (e) {
      throw new Error('Não foi possível instanciar o usuário');
    }
  }

  private _setAuthenticate(user?: IUser) {
    if (user && user.token) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      AuthService._user = <User>{};
    }
  }

  getHeader() {
    if (this.user.token) {
      return new RequestOptions({
        headers: new Headers({ 'Authorization': 'Bearer ' + this.user.token }),
      });
    }
  }

}
