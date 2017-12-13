import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ISelect } from './../_models/index';
import { AuthService } from '../../../_services/index';

@Injectable()
export class AreasService {

  private _lista: ISelect[] = [];
  private _subjectLista = new ReplaySubject<ISelect[]>();

  constructor(
    private _authService: AuthService,
  ) {
    this._load();
  }

  private _load() {
    this._authService.user.subscribe(usuario => {
      try {
        setTimeout(() => {
          usuario.areas.forEach(area => {
            this._lista.push(<ISelect>{ Id: area.ID, Descricao: area.Nome });
          });

          this._subjectLista.next(this._lista);
          this._subjectLista.complete();
        }, 1000);
      } catch (e) { }
    });
  }

  get list(): Observable<ISelect[]> {
    return this._subjectLista.asObservable();
  }

  // getById(id: string): ISelect[] {
  //   return this._lista.filter(item =>
  //       item.id.toString() === id.toString()
  //     );
  // }
}
