import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../../shared/shared.module';

// routing
import { SlasRouting } from './slas.routing';

// services
import { SlasSevices, AreasSevices, ComplexidadesService } from './_services/index';

// components
import { SlasComponent } from './slas.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SlasRouting,
    HttpModule,
  ],
  declarations: [
    SlasComponent,
    ListaComponent,
    NovoComponent,
  ],
  providers: [
    SlasSevices,
    AreasSevices,
    ComplexidadesService,
  ]
})
export class SlasModule { }
