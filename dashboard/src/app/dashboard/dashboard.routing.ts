import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './errors/index';

const acessoRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'slas', loadChildren: 'app/dashboard/slas/slas.module#SlasModule' },
      {
        path: '**',
        component: Page404Component,
        pathMatch: 'full'
      },
    ],
  },
];

export const DashboardRouting = RouterModule.forChild(acessoRoutes);
