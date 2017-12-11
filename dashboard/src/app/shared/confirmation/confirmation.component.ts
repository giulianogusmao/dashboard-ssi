import { Component } from '@angular/core';
import { ConfirmSettings } from '@jaspero/ng2-confirmations/src/interfaces/confirm-settings';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'confirmation.component.html',
})
export class ConfirmationComponent {

  options = <ConfirmSettings>{
    // overlay: false,
    confirmText: 'Sim',
    declineText: 'Não',
  };
}
