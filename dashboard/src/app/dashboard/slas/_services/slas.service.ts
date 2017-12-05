import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ISla } from '../_models/index';
import { Helper } from '../../../_helpers/index';
import { AuthService } from './../../../_services/index';

@Injectable()
export class SlasSevices {

  private _list: ISla[] = [];
  private _observableList: BehaviorSubject<ISla[]> = new BehaviorSubject([]);

  constructor(
    private _http: Http,
    private _authService: AuthService
  ) { }

  Add(sla) {
    return this._http
    .post(Helper.apiUrl('/sla/novo'), sla, this._authService.getHeader())
    .map(Helper.extractData)
    .do((res) => {
      if (!res.Error) {
        this._list.push(sla);
        this._observableList.next(this._list);
      }
    })
    .catch(Helper.handleError);
  }

  Listar(): Observable<ISla[]> {
    return this._http
      .get(Helper.apiUrl('/sla'), this._authService.getHeader())
      .map(Helper.extractData)
      .do((slas: ISla[]) => {
        this._list = slas;
        this._observableList.next(this._list);
        return this.list;
      })
      .catch(Helper.handleError);
  }

  getById(id: string): Observable<ISla> {
    return this._http
      .get(Helper.apiUrl(`/sla/${id}`), this._authService.getHeader())
      .map(Helper.extractData)
      .catch(Helper.handleError);
  }

  get list(): Observable<ISla[]> {
    return this._observableList.asObservable();
  }
}
