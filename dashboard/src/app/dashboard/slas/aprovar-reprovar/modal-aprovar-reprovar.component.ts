import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormBuilder , Validators } from '@angular/forms';
import { Helper, FormHelper } from '../../../_helpers/index';

@Component({
  selector: 'app-modal-aprovar-reprovar',
  templateUrl: './modal-aprovar-reprovar.component.html',
})
export class ModalAprovarReprovarComponent extends FormHelper implements OnInit {
  public aprovar: boolean;
  public active: boolean;
  public body: any;
  public title: string;
  public subtitle: string;
  public onClose: Subject<any>;
  public loading: boolean;
  public expandir: boolean;
  public textButtonConfirm: string;

  public constructor(
    private _bsModalRef: BsModalRef,
    protected _fb: FormBuilder,
  ) {
    super(_fb);
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
    this.createForm({
      justificativa: ['', Validators.required]
    });
  }

  public showConfirmationModal(title: string, subtitle: string, body: any, aprovar: boolean) {
    this.title = title;
    this.body = body;
    this.aprovar = aprovar;
    this.subtitle = subtitle;
    this.active = true;
    this.textButtonConfirm = aprovar ? 'Aprovar' : 'Reprovar';
    return this._bsModalRef;
  }

  public onConfirm(): void {
    if (!this.aprovar && this.form.invalid) {
      this.markFormTouched();
    } else {
      this.active = false;
      this.loading = true;
      this.onClose.next({ option: true, justificativa: this.form.value.justificativa });
    }
  }

  public onCancel(): void {
    this.active = false;
    this.onClose.next({ option: false });
    this._bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.onClose.next({ option: null });
    this._bsModalRef.hide();
  }

  public toggleExpandir() {
    this.expandir = !this.expandir;
  }
}
