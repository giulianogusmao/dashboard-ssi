import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AuthService } from '../../../_services/index';
import { User } from '../../../_models/index';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  usuario: User;
  private _inscricoes: Subscription[] = [];
  @Input() routerMain;

  constructor(
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this._inscricoes.push(this._authService.user.subscribe(
      user => this.usuario = user
    ));
  }

  ngOnDestroy() {
    try {
      this._inscricoes.forEach(inscricao => inscricao.unsubscribe());
    } catch (e) { }
  }
}
