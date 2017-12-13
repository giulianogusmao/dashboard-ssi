import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ISelect, IParametros, Status } from '../_models/index';
import { Helper } from '../../../_helpers/index';

@Injectable()
export class ParametrosSevices {

  private _parametros: IParametros = <IParametros>{};
  private _observableParams: ReplaySubject<IParametros> = new ReplaySubject();
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
        setTimeout(() => {
          this._parametros = parametros;
          this._parametros.SlaStatus = this._parametros.SlaStatus.map(status => new Status(status.Id, status.Descricao));
          this._observableParams.next(this._parametros);
          this._observableParams.complete();
        }, 2000);
      })
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        }

        return Observable.empty();
      });
  }

  get list(): Observable<IParametros> {
    return this._observableParams.asObservable();
  }

  get errors(): Observable<any> {
    return this._observableErrors.asObservable();
  }
}
