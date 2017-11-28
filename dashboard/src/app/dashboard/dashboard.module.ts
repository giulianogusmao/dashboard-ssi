import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

// components
import { DashboardComponent } from './dashboard.component';
import { AppHeaderComponent } from './cabecalho/app-header/app-header.component';
import { AppMenuComponent } from './cabecalho/app-menu/app-menu.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    AppHeaderComponent,
    AppMenuComponent,
  ]
})
export class DashboardModule { }
