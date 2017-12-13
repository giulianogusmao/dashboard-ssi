import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../_services/index';
// import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class InsertGuard implements CanActivate {

  private _subject = new ReplaySubject<boolean>();

  constructor(
    private _router: Router,
    private _authService: AuthService,
    // private _notificationService: NotificationsService,
  ) { }

  // verifica se o usuário pode cadastrar sla
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._authService.user.subscribe(
      usuario => {
        if (usuario.canInsert()) {
          this._subject.next(true);
        } else {
          // this._notificationService.error('Acesso Negado', 'Seu perfil não permissão para cadastrar novos SLAs');
          this._router.navigate(['/dashboard/slas']);
        }
      },
      () => {
        this._subject.next(false);
      });

    return this._subject;
  }
}
