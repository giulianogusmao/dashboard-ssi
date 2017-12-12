import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component',
})
export class ModalConfirmationComponent implements OnInit {

  public loading: boolean;
  public isDanger: boolean;
  public title: string;
  public body: string;
  public onClose: Subject<boolean>;

  public constructor(
    private _bsModalRef: BsModalRef,
  ) { }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirmationModal(title: string, body: string, isDanger: boolean = false) {
    this.title = title;
    this.body = body;
    this.loading = false;
    this.isDanger = isDanger;
    return this._bsModalRef;
  }

  public onConfirm(): void {
    this.loading = true;
    this.onClose.next(true);
  }

  public onCancel(): void {
    this.loading = true;
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
    this.loading = true;
    this.onClose.next(null);
    this._bsModalRef.hide();
  }
}
