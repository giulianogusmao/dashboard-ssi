import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Menu } from './index';
import { Helper } from './../../../_helpers/index';
import { AuthService } from './../../../_services/index';

@Injectable()
export class MenuService {

  constructor(
    private _http: Http,
    private _authService: AuthService,
  ) { }

  load(): Observable<Menu[]> {
    return this._http
      .get(Helper.apiUrl('/menu'), this._authService.getHeader())
      .map(res => res.json());
  }
}
