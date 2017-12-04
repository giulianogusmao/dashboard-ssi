import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AlertMessage } from './alert.model';

@Injectable()
export class AlertService {

  private _subject = new Subject<AlertMessage>();
  private _timeralert;
  private _timeout = 5000;
  private _keepAfterNavigationChange = false;

  constructor(
    private router: Router,
  ) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this._keepAfterNavigationChange) {
          // only keep for a single location change
          this._keepAfterNavigationChange = false;
        } else {
          // clear alert
          this._subject.next();
        }
      }
    });
  }


  default(msg: string, timeout = this._timeout, keepAfterNavigationChange = false) {
    this._msg(msg, 'dark', timeout, keepAfterNavigationChange);
  }

  success(msg: string, timeout = this._timeout, keepAfterNavigationChange = false) {
    this._msg(msg, 'success', timeout, keepAfterNavigationChange);
  }

  error(msg: string, timeout = this._timeout, keepAfterNavigationChange = false) {
    this._msg(msg, 'danger', timeout, keepAfterNavigationChange);
  }

  private _msg(msg: string, type: string, timeout = this._timeout, keepAfterNavigationChange) {
    this._keepAfterNavigationChange = keepAfterNavigationChange;

    if (timeout) {
      this._timeralert = setTimeout(() => {
        // clear after timeout
        this._subject.next();
      }, timeout);
    }

    this._subject.next(new AlertMessage(type, msg));
  }

  getMessage(): Observable<AlertMessage> {
    return this._subject.asObservable();
  }
}
