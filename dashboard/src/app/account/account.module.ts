import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
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
