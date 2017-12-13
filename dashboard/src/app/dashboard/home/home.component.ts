import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Helper } from '../../_helpers/index';
import { AuthService } from './../../_services/index';
import { User } from '../../_models/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template: `<div [innerHTML]="fetchedHtml"></div>`
})
export class HomeComponent implements OnInit, OnDestroy {

  public loading: boolean;
  public usuario: User;
  public url: SafeResourceUrl;
  private _link: string;
  private _subscriptions: Subscription[] = [];

  fetchedHtml;

  constructor(
    private _authService: AuthService,
    private _sanitizer: DomSanitizer,
    private _httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.loading = true;

    this._subscriptions.push(this._authService.user.subscribe(
      usuario => {
        this.usuario = usuario;
        this._link = Helper.apiUrl(
          'https://esquadriasinova.com.br/', false);
          // `/ibi_apps/WFServlet.ibfs?IBIAPP_app=ped_ssi&IBIF_ex=PED_SSI_FEX_DASHBOARD&PESSOA=${usuario.id}`, 'zion');

        this.url = this._sanitizer.bypassSecurityTrustResourceUrl(this._link);

        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }));

    // this._httpClient.get<any>('https://esquadriasinova.com.br/', { headers: { 'x-forwarded-host': 'foo' } }).subscribe(
    //   res => this.fetchedHtml = res
    // );
  }

  ngOnDestroy() {
    try {
      this._subscriptions.forEach(
        subscription => subscription.unsubscribe());
    } catch (e) { }
  }

}
