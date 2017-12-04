import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent,
  ],
  exports: [
    AlertComponent,
  ],
  providers: [
    AlertService,
  ]
})
export class AlertModule { }
