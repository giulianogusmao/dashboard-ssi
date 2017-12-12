import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
})
export class NotificationComponent {
  /*
   * Documentação:
   * https://jaspero.co/resources/projects/ng-notifications
   */

  public options = {
    // position: ['bottom', 'left'],
    // showProgressBar: false,
    // preventLastDuplicates: 'visible',
    timeOut: 5000,
    icons: {
      'alert': null,
      'info': null,
      'warn': null,
      'error': null,
      'success': null,
    }
  };
}
