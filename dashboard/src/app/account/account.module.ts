import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from '../shared/shared.module';

// routing
import { AccountRouting } from './account.routing';

// components
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RecuperarAcessoComponent } from './recuperar-acesso/recuperar-acesso.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRouting,
    SharedModule,
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    RecuperarAcessoComponent,
  ],
})
export class AccountModule { }
