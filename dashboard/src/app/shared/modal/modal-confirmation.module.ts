import { NgModule } from '@angular/core';

import { ModalConfirmationComponent } from './modal-confirmation.component';

@NgModule({
  declarations: [
    ModalConfirmationComponent,
  ],
  exports: [
    ModalConfirmationComponent,
  ],
  entryComponents: [
    ModalConfirmationComponent,
  ]
})
export class NotificationModule { }
