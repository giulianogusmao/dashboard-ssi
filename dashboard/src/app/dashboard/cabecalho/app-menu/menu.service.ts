import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Menu } from './menu';
import { Helper } from './../../../_helpers/index';
import { User } from '../../../_models/index';

@Injectable()
export class MenuService {

  private _lista: Menu[];
  private _observable = new BehaviorSubject<Menu[]>([]);

  constructor() {
    this._lista = [
      new Menu('Home'),
      new Menu('Listar SLAs', '/slas'),
      new Menu('Cadastrar SLA', '/slas/novo', ['administrador']),
      new Menu('Editar SLA', '/slas/editar', [], false),
    ];
  }

  load(user: User): Observable<Menu[]> {
    this._observable.next(this._lista.filter(
      menu => menu.canBeAccessed(user.tipoUsuario)));
    return this._observable.asObservable();
  }
}
