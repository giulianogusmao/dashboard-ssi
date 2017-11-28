import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Helper } from '../_helpers/helper';
import { User, UserResponse } from '../_models/index';

@Injectable()
export class AuthService {

  private static _user: User;

  constructor(
    private _router: Router,
    private _http: Http,
  ) { }

  login(username: string, password: string) {
    return this._http
      .post(Helper.apiUrl('/authenticate'), { username, password })
      .map(res => res.json())
      .do((user: UserResponse) => {
        if (user && user.token) {
          this._setAuthenticate(user);
        } else {
          this._setAuthenticate();
          throw new Error('Login/Senha incorreto!');
        }
      })
      .catch(err => {
        console.error(err);
        this._setAuthenticate();
        throw new Error('Ocorreu um erro, tente novamente.');
      });
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

  private _createUser(user: UserResponse): User {
    try {
      if (!AuthService._user) {
        AuthService._user = new User(user.nome, user.perfil, user.login, user.token);
      }

      return AuthService._user;
    } catch (e) {
      throw new Error('Não foi possível instanciar o usuário');
    }
  }

  private _setAuthenticate(user?: UserResponse) {
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
