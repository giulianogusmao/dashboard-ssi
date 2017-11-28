import { NgModule } from '@angular/core';
import {
  SimpleNotificationsModule,
  // NotificationsService,
} from 'angular2-notifications';

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
  providers: [
    // NotificationsService,
  ]
})
export class NotificationModule { }
