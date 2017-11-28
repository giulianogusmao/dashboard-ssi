import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../../_services/index';
import { User } from '../../../_models/index';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
})
export class AppHeaderComponent implements OnInit {

  private usuario: User;
  @Input() routerMain;

  constructor(
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.usuario = this._authService.user;
  }
}
