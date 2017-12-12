import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

import { Sla } from '../_models/index';
import { SlasSevices } from './../_services/index';
import { ModalAprovarReprovarComponent } from './modal-aprovar-reprovar.component';

@Component({
  selector: 'app-aprovar-reprovar',
  templateUrl: 'aprovar-reprovar.component.html',
})
export class AprovarReprovarComponent implements OnDestroy {

  @Input() sla: Sla;
  private _subscriptions: Subscription[] = [];
  @Output() refreshList = new EventEmitter();

  public constructor(
    private _bsModalService: BsModalService,
    private _slasService: SlasSevices,
    private _notificationService: NotificationsService,
  ) { }

  ngOnDestroy() {
    try {
      this._subscriptions.forEach(
        subscription => subscription.unsubscribe());
      this._subscriptions = [];
    } catch (e) { }
  }

  public openModalAprovarSLA(): void {
    const modal = this._bsModalService.show(ModalAprovarReprovarComponent);
    const bsModalRef = (<ModalAprovarReprovarComponent>modal.content).showConfirmationModal(
      'Confirmar aprovar SLA', null, this.sla, true
    );

    this._subscriptions.push((<ModalAprovarReprovarComponent>modal.content).onClose.subscribe(confirm => {
      if (confirm.option === true) {
        this._slasService.aprovarReprovar(this.sla, this.sla.IdAprovar).subscribe(
          response => {
            setTimeout(() => {
              this.refreshList.emit();
              this._notificationService.success('', 'SLA aprovado com sucesso!');
              bsModalRef.hide();
            }, 500);
          },
          err => {
            console.error(err);
            this._notificationService.error('', 'Não foi possível aprovar o SLA. Tente novamente');
            bsModalRef.hide();
          });
      }
    }));
  }

  public openModalReprovarSLA(): void {
    const modal = this._bsModalService.show(ModalAprovarReprovarComponent);
    const bsModalRef = (<ModalAprovarReprovarComponent>modal.content).showConfirmationModal(
      'Confirmar reprovar SLA', null, this.sla, false
    );

    this._subscriptions.push((<ModalAprovarReprovarComponent>modal.content).onClose.subscribe(confirm => {
      if (confirm.option === true) {
        this._slasService.aprovarReprovar(this.sla, this.sla.IdReprovar, confirm.justificativa).subscribe(
          response => {
            setTimeout(() => {
              this.refreshList.emit();
              this._notificationService.success('', 'SLA reprovado com sucesso!');
              bsModalRef.hide();
            }, 500);
          },
          err => {
            console.error(err);
            this._notificationService.error('', 'Não foi possível reprovar o SLA. Tente novamente');
            bsModalRef.hide();
          });
      }
    }));
  }


}
