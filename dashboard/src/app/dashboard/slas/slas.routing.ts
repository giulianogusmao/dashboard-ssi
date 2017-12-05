import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlasComponent } from './slas.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';

const routes: Routes = [
  {
    path: '',
    component: SlasComponent,
    children: [
      { path: '', component: ListaComponent },
      { path: 'editar/:id', component: NovoComponent },
      { path: 'detalhe/:id', component: NovoComponent },
      { path: 'novo', component: NovoComponent }
    ]
  }
];

export const SlasRouting = RouterModule.forChild(routes);
