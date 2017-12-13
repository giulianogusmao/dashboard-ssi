import { Helper } from './../../_helpers/helper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../_services/index';
import { AlertService } from '../../shared/alert/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aguardando: boolean;
  private _inscricao: Subscription;
  private _notifications = [];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService
  ) { }

  login() {
    if (this.form.valid) {
      this._authenticateUser(this.form.value.login, this.form.value.password);
    } else {
      this._alertService.default('Informe seu Login e Senha');
    }
  }

  private _authenticateUser(login?: string, password?: string) {
    this.aguardando = true;
    this._inscricao = this._authService
      .login(login, password)
      .subscribe(
      () => this._router.navigate(['/dashboard']),
      err => {
        this.aguardando = false;
        console.error(err['message']);
        this._alertService.error('Não foi possível realizar o login');
      });
  }

  ngOnInit() {
    this._authService.logout();

    this.form = this._fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });

    if (!Helper.useFake()) {
      this._authenticateUser();
    }
  }

  ngOnDestroy() {
    try {
      this._inscricao.unsubscribe();
    } catch (e) { }
  }

}
