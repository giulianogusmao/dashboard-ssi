import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IArea } from '../_models/index';
import { Helper } from '../../../_helpers/index';
import { AuthService } from './../../../_services/index';

@Injectable()
export class AreasSevices {

  private _list: IArea[] = [];
  private _observableList: BehaviorSubject<IArea[]> = new BehaviorSubject([]);

  constructor(
    private _http: Http,
    private _authService: AuthService
  ) { }

  getAll(): Observable<IArea[]> {
    return this._http
      .get(Helper.apiUrl('/areas'), this._authService.getHeader())
      .map(Helper.extractData)
      .do((slas: IArea[]) => {
        this._list = slas;
        this._observableList.next(this._list);
        return this.list;
      })
      .catch(Helper.handleError);
  }

  get list(): Observable<IArea[]> {
    return this._observableList.asObservable();
  }
}
