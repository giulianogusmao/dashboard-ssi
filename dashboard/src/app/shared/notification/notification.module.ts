import { NgModule } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    NotificationComponent,
  ],
  exports: [
    SimpleNotificationsModule,
    NotificationComponent,
  ],
})
export class NotificationModule { }
