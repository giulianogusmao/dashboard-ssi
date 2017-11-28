import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private _inscricao: Subscription;
  private _notifications = [];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
  ) { }

  login() {
    if (this.form.valid) {
      this._inscricao = this._authService
        .login(this.form.value.login, this.form.value.password)
        .subscribe(
        res => this._router.navigate(['/dashboard']),
        err => console.log(err)
        );
    }
  }

  ngOnInit() {
    this._authService.logout();

    this.form = this._fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnDestroy() {
    try {
      this._inscricao.unsubscribe();
    } catch (e) { }
  }

}
