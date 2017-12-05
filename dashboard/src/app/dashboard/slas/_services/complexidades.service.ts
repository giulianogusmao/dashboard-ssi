import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IComplexidade } from './../_models/index';

@Injectable()
export class ComplexidadesService {

  private _lista: IComplexidade[] = [];
  private _subjectAll = new BehaviorSubject<IComplexidade[]>([]);

  constructor() {
    this._lista = [
      { id: 'Baixa', label: 'Baixa' },
      { id: 'Média', label: 'Média' },
      { id: 'Alta', label: 'Alta' },
    ];
    this._subjectAll.next(this._lista);
  }

  getAll(): Observable<IComplexidade[]> {
    return this._subjectAll.asObservable();
  }

  getById(id: string): IComplexidade[] {
    return this._lista.filter(item =>
        item.id.toString() === id.toString()
      );
  }
}
