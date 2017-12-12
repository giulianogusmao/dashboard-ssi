import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlasComponent } from './slas.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { InsertGuard, EditGuard, ListGuard } from './_guards/index';

const routes: Routes = [
  {
    path: '',
    component: SlasComponent,
    children: [
      {
        path: '',
        component: ListaComponent,
        canActivate: [ListGuard],
      },
      {
        path: 'editar/:id',
        component: NovoComponent,
        canActivate: [EditGuard],
      },
      {
        path: 'novo',
        component: NovoComponent,
        canActivate: [InsertGuard],
      }
      // {
      //   path: 'detalhe/:id',
      //   component: NovoComponent
      // },
    ]
  }
];

export const SlasRouting = RouterModule.forChild(routes);
