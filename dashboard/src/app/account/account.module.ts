import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

// components
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RecuperarAcessoComponent } from './recuperar-acesso/recuperar-acesso.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    LogoutComponent,
    RecuperarAcessoComponent,
  ],
})
export class AccountModule { }
