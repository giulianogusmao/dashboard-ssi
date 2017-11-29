import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing
import { SlasRouting } from './slas.routing';

// components
import { SlasComponent } from './slas.component';

import { ListaComponent } from './lista/lista.component';
import { BuscarComponent } from './lista/buscar/buscar.component';
import { ListagemComponent } from './lista/listagem/listagem.component';

import { NovoComponent } from './novo/novo.component';

@NgModule({
  imports: [
    CommonModule,
    SlasRouting
  ],
  declarations: [
    SlasComponent,
    ListaComponent,
    BuscarComponent,
    ListagemComponent,
    NovoComponent,
  ],
})
export class SlasModule { }
