import { Component, Input, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';

import { Sla } from '../_models/index';
import { SlasSevices } from './../_services/index';
import { ModalConfirmationComponent } from './modal-confirmation.component';

@Component({
  selector: 'app-aprovar-reprovar',
  templateUrl: 'aprovar-reprovar.component.html',
})
export class AprovarReprovarComponent {

  @Input() sla: Sla;
  // @Output() modalConfirm = new EventEmitter<boolean>();

  public constructor(
    private _bsModalService: BsModalService,
    private _slasService: SlasSevices
  ) { }

  public openModalAprovarSLA(): void {
    const modal = this._bsModalService.show(ModalConfirmationComponent);
    (<ModalConfirmationComponent>modal.content).showConfirmationModal(
      'Confirmar aprovar SLA', this.sla
    );

    (<ModalConfirmationComponent>modal.content).onClose.subscribe(result => {
      // this.modalConfirm.emit(result);
      if (result === true) {
        // this._slasService.aprovarReprovar(this.sla, 1).subscribe()
      }
    });
  }

}
