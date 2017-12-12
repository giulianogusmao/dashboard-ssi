import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './../../shared/shared.module';

// routing
import { InsertGuard, EditGuard, ListGuard } from './_guards/index';
import { SlasRouting } from './slas.routing';

// services
import { AuthInterceptor } from './../../_interceptors/index';
import {
  SlasSevices,
  AreasService,
  ParametrosSevices,
} from './_services/index';

// components
import { SlasComponent } from './slas.component';
import { ListaComponent } from './lista/index';
import { NovoComponent } from './novo/index';
import { DetalheComponent } from './detalhe/index';
import {
  AprovarReprovarComponent,
  ModalAprovarReprovarComponent,
} from './aprovar-reprovar/index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SlasRouting,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SlasComponent,
    ListaComponent,
    NovoComponent,
    DetalheComponent,
    AprovarReprovarComponent,
    ModalAprovarReprovarComponent,
  ],
  entryComponents: [
    ModalAprovarReprovarComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    SlasSevices,
    AreasService,
    ParametrosSevices,
    InsertGuard,
    EditGuard,
    ListGuard,
  ]
})
export class SlasModule { }
