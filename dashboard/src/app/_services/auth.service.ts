import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Helper } from '../_helpers/helper';
import { User, UserRequest } from '../_models/index';

@Injectable()
export class AuthService {

  private _isAuthenticated: boolean;

  constructor(
    private _router: Router,
    private _http: Http,
  ) { }

  login(username: string, password: string) {
    return this._http
      .post('/api/authenticate', { username, password })
      .map(res => res.json())
      .do((user: UserRequest) => {
        if (user && user.token) {
          this._setAuthenticate(new User(user.nome, user.perfil, user.login, user.token));
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
    return localStorage.getItem('currentUser');
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  private _setAuthenticate(user: User = <User>{}) {
    this._isAuthenticated = !!user;

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

}
