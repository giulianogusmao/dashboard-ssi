import { NgModule } from '@angular/core';

import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { ConfirmationComponent } from './confirmation.component';

@NgModule({
  imports: [
    JasperoConfirmationsModule,
  ],
  declarations: [
    ConfirmationComponent,
  ],
  exports: [
    JasperoConfirmationsModule,
    ConfirmationComponent,
  ],
})
export class ConfirmationModule { }
