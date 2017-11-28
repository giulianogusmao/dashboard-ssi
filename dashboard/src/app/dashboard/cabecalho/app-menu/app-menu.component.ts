import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Menu, MenuService } from './index';

@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.component.html',
  providers: [MenuService],
})
export class AppMenuComponent implements OnInit, OnDestroy {

  public menu: Menu[] = [];
  public msgMenu: string;
  @Input() routerMain;
  private _inscricao: Subscription;

  constructor(
    private _router: Router,
    private _menuService: MenuService,
  ) { }

  ngOnInit() {
    this.msgMenu = 'Carregando menu...';
    this._inscricao = this._menuService.load().subscribe(
      menu => {
        this.msgMenu = '';
        this.menu = menu;
      },
      err => this.msgMenu = 'Não foi possível carregar o menu'
    );
  }

  logout(event: Event) {
    event.preventDefault();
    this._router.navigate(['/']);
  }

  ngOnDestroy() {
    try {
      this._inscricao.unsubscribe();
    } catch (e) { }
  }
}
