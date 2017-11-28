import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RecuperarAcessoComponent } from './recuperar-acesso/recuperar-acesso.component';

const acessoRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'recuperar-acesso', component: RecuperarAcessoComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

export const AccountRouting = RouterModule.forChild(acessoRoutes);
