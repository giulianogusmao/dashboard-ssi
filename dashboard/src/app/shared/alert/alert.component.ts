import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { AlertMessage } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  animations: [
    trigger('alertInOut', [
      state('in', style({ transform: 'translateY(0)', height: '*' })),

      transition('void => *', [
        animate(200, keyframes([
          style({ opacity: 0, height: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: .7, height: '*', transform: 'translateY(1rem)', offset: 0.3 }),
          style({ opacity: 1, height: '*', transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),

      transition('* => void', [
        animate(200, keyframes([
          style({ opacity: 1, height: '*', transform: 'translateY(0)', offset: 0 }),
          style({ opacity: .3, height: '*', transform: 'translateY(1rem)', offset: 0.7 }),
          style({ opacity: 0, height: 0, transform: 'translateY(-100%)', offset: 1.0 })
        ]))
      ]),
    ])
  ],
})
export class AlertComponent implements OnInit, OnDestroy {

  alert: AlertMessage;
  private _inscricao: Subscription;

  constructor(
    private _alertService: AlertService,
  ) { }

  ngOnInit() {
    this._inscricao = this._alertService.getMessage().subscribe(
      msg => this.alert = msg
    );
  }

  ngOnDestroy() {
    // this._inscricao.unsubscribe();
  }
}
