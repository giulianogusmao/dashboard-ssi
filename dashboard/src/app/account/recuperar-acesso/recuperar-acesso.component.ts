import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recuperar-acesso',
  templateUrl: './recuperar-acesso.component.html',
})
export class RecuperarAcessoComponent implements OnInit {

  form: FormGroup;
  private _inscricao: Subscription;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      email: [null, Validators.required],
    });
  }

}
