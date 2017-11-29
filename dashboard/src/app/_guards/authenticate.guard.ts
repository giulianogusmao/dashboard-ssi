import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/index';

@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  // verifica se o usuário pode acessar o módulo
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._verificaAutenticacao();
  }

  // verifica se o usuário pode carregar o módulo
  canLoad(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._verificaAutenticacao();
  }

  private _verificaAutenticacao(): boolean {
    if (this._authService.isAuthenticated) {
      return true;
    } else {
      this._router.navigate(['/account/login']);
      return false;
    }
  }
}
