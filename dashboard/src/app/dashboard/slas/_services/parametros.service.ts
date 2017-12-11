import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ISelect, IParametros, Status } from '../_models/index';
import { Helper } from '../../../_helpers/index';

@Injectable()
export class ParametrosSevices {

  private _parametros: IParametros = <IParametros>{};
  private _observableParams: BehaviorSubject<IParametros> = new BehaviorSubject(this._parametros);
  private _observableErrors: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private _httpClient: HttpClient,
  ) {
    this._load().subscribe(
      () => null,
      err => {
        console.error(err);
        this._observableErrors.next({ Error: true, Message: err });
      }
    );
  }

  private _load() {
    return this._httpClient
      .get<IParametros>(Helper.apiUrl('/sla/Parametros'))
      .do(parametros => {
        this._parametros = parametros;
        this._parametros.SlaStatus = this._parametros.SlaStatus.map(status => new Status(status.Id, status.Descricao));
        this._observableParams.next(this._parametros);
      });
  }

  get list(): Observable<IParametros> {
    return this._observableParams.asObservable();
  }

  get errors(): Observable<any> {
    return this._observableErrors.asObservable();
  }
}
