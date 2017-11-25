import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  private _inscricao: Subscription;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
  }

  ngOnDestroy() {
    try {
      this._inscricao.unsubscribe();
    } catch (e) { }
  }

}
