import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../_services/index';

@Injectable()
export class ListGuard implements CanActivate {

  private _subject = new ReplaySubject<boolean>();

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  // verifica se o usuário pode listar os slas
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._authService.user.subscribe(
      usuario => {
        if (usuario.canList()) {
          this._subject.next(true);
        } else {
          this._router.navigate(['/dashboard']);
        }
      },
      () => {
        this._subject.next(false);
      });

    return this._subject;
  }
}
