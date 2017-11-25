import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  private _inscricao: Subscription;
  private _notifications = [];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _notificationService: NotificationsService
  ) {
    this.form = this._fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    this._notifications.push(
      this._notificationService.html('Eita bicho', 'alert', 'custon-style')
    );
  }

  ngOnDestroy() {
    try {
      this._notifications.forEach(
        notificacao => this._notificationService.remove(notificacao['id'])
      );
    } catch (e) { }

    try {
      this._inscricao.unsubscribe();
    } catch (e) { }
  }

}
