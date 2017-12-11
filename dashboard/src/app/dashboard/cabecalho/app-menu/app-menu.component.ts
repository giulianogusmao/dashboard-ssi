import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Menu, MenuService } from './index';
import { AuthService } from '../../../_services/index';

@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.component.html',
  providers: [MenuService],
})
export class AppMenuComponent implements OnInit, OnDestroy {

  public menu: Menu[] = [];
  public msgMenu: string;
  @Input() routerMain;
  private _inscricoes: Subscription[] = [];

  constructor(
    private _router: Router,
    private _menuService: MenuService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.msgMenu = 'Carregando menu...';

    this._inscricoes.push(this._authService.user.subscribe(user => {
      this._inscricoes.push(this._menuService.load(user).subscribe(menu => {
          this.msgMenu = '';
          this.menu = menu;
        },
        err => this.msgMenu = 'Não foi possível carregar o menu'
      ));
    },
    err => this.msgMenu = 'Erro ao carregar usuário'));
  }

  logout(event: Event) {
    event.preventDefault();
    this._router.navigate(['/']);
  }

  ngOnDestroy() {
    try {
      this._inscricoes.forEach(inscricao => inscricao.unsubscribe());
    } catch (e) { }
  }
}
