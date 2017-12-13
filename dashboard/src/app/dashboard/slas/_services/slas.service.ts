import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Sla, ISla, ISlaEdit, IAtivaInativa } from '../_models/index';
import { Helper } from '../../../_helpers/index';
import { AuthService } from './../../../_services/index';

@Injectable()
export class SlasSevices {

  private _list: ISla[] = [];
  private _observableList: BehaviorSubject<ISla[]> = new BehaviorSubject([]);

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  add(sla) {
    return this._httpClient
      .post(Helper.apiUrl('/sla/InsereSla'), sla);
  }

  getAll(): Observable<ISla[]> {
    if (Helper.useFake) {
      const slas = [
        {
          "IdSla": 2,
          "NomeArea": "GINFO_WEBFOCUS",
          "Complexidade": "MÉDIA",
          "Prioridade": "URGENTE",
          "Status": "NOVO",
          "SLA": 5,
          "InicioVigencia": "07/12/2017",
          "FimVigencia": null,
          "CanEdit": false,
          "CanAprove": false,
          "Ativo": false,
          "MotivoRecusa": null
        },
        {
          "IdSla": 4,
          "NomeArea": "GINFO_WEBFOCUS",
          "Complexidade": "BAIXA",
          "Prioridade": "NÃO-URGENTE",
          "Status": "AGUARDANDO APROVAÇÃO",
          "SLA": 3,
          "InicioVigencia": "08/12/2017",
          "FimVigencia": null,
          "CanEdit": false,
          "CanAprove": false,
          "Ativo": true,
          "MotivoRecusa": null
        },
        {
          "IdSla": 5,
          "NomeArea": "GINFO_INDICADORES_SSI",
          "Complexidade": "MÉDIA",
          "Prioridade": "URGENTE",
          "Status": "NOVO",
          "SLA": 10,
          "InicioVigencia": null,
          "FimVigencia": null,
          "CanEdit": false,
          "CanAprove": false,
          "Ativo": true,
          "MotivoRecusa": null
        },
        {
          "IdSla": 6,
          "NomeArea": "GINFO_PORTAL_UNICO",
          "Complexidade": "ALTA",
          "Prioridade": "NÃO-URGENTE",
          "Status": "AGUARDANDO APROVAÇÃO",
          "SLA": 20,
          "InicioVigencia": null,
          "FimVigencia": null,
          "CanEdit": false,
          "CanAprove": false,
          "Ativo": true,
          "MotivoRecusa": null
        }
      ];
      const subject = new BehaviorSubject<ISla[]>([]);
      setTimeout(() => {
        subject.next(slas);
      }, 500);
      return subject;
    }

    return this._httpClient
      .get<ISla[]>(Helper.apiUrl('/sla/ListaSLA'))
      .do(slas => {
        console.log(slas);
        this._list = slas;
        this._observableList.next(this._list);
        return this.list;
      });
  }

  toggleAtivaDesativa(sla: Sla): Observable<IAtivaInativa> {
    const data = <IAtivaInativa>{ idsla: sla.IdSla, ativo: sla.Ativo ? 0 : 1 };

    if (Helper.useFake) {
      console.log(data);
      const subject = new BehaviorSubject(data);
      return subject;
    }

    return this._httpClient
      .post<IAtivaInativa>(Helper.apiUrl('/sla/AtivaInativa'), data)
      .do(() => data);
  }

  aprovarReprovar(sla: Sla, idstatus: number, justificativa: string = null): Observable<any> {
    const data = <any>{ idsla: sla.IdSla, idStatus: idstatus, MensagemRecusa: justificativa };

    if (Helper.useFake) {
      console.log(data);
      const subject = new BehaviorSubject(data);
      return subject;
    }

    return this._httpClient
      .post<any>(Helper.apiUrl('/sla/AlteraStatus'), data);
  }

  getById(id: number): Observable<ISlaEdit> {
    if (Helper.useFake) {
      console.log(`getById ${id}`);
      const response = new ReplaySubject<ISlaEdit>();
      setTimeout(() => {
        response.next({
          IdSla: 2,
          idArea: 834,
          idComplexidade: 2,
          idPrioridade: 1,
          idStatus: 2,
          SLA: 5,
          Ativo: false,
          MotivoRecusa: null
        });
        response.complete();
      }, 1000);
      return response.asObservable();
    }

    return this._httpClient
      .get<ISlaEdit>(Helper.apiUrl(`/sla/RetornaSLA/${id}`));
  }

  get list(): Observable<ISla[]> {
    return this._observableList.asObservable();
  }
}
