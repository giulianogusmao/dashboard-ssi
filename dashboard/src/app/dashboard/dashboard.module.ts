import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRouting } from './dashboard.routing';

// components
import { DashboardComponent } from './dashboard.component';
import { AppHeaderComponent } from './cabecalho/app-header/app-header.component';
import { AppMenuComponent } from './cabecalho/app-menu/app-menu.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './errors/index';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    Error404Component,
    AppHeaderComponent,
    AppMenuComponent,
  ]
})
export class DashboardModule { }
