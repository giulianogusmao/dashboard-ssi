import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Sla } from '../_models/index';

@Component({
  selector: 'app-modal-aprovar',
  templateUrl: './modal-aprovar.component.html',
})
export class ModalAprovarComponent {

  title: string;
  sla: Sla = new Sla();
  expandir: boolean;

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  toggleExpandir() {
    this.expandir = !this.expandir;
  }

  confirm(): void {
    console.log('confirm');
    this.bsModalRef.hide();
  }
}
