import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing
import { SlasRouting } from './slas.routing';
import { SharedModule } from './../../shared/shared.module';

// components
import { SlasComponent } from './slas.component';

import { ListaComponent } from './lista/lista.component';

import { NovoComponent } from './novo/novo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SlasRouting,
  ],
  declarations: [
    SlasComponent,
    ListaComponent,
    NovoComponent,
  ],
})
export class SlasModule { }
