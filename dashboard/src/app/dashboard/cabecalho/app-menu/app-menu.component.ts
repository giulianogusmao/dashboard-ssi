import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Menu } from './Menu';
// import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.component.html',
  // providers: [MenuService]
})
export class AppMenuComponent implements OnInit, OnDestroy {

  public menu: Menu[] = [];
  public msgMenu: string;
  public routerPainel = '/painel';
  private _inscricao: Subscription;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this.msgMenu = 'Carregando menu...';
    // this._inscricao = this._menuService.load().subscribe(
    //   res => {
    //     this.msgMenu = '';
    //     this.menu = res;
    //   },
    //   err => this.msgMenu = 'Não foi possível carregar o menu'
    // );
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
