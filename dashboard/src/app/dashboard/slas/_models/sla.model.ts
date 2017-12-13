import { ISla } from './sla.interface';
import { ISlaEdit } from './sla-edit.interface';
import { Helper } from '../../../_helpers/index';

export class Sla implements ISla {

  IdSla: number;
  NomeArea: string;
  Complexidade: string;
  Prioridade: string;
  Status: string;
  SLA: number;
  InicioVigencia: string;
  FimVigencia: string;
  CanEdit: boolean;
  CanAprove: boolean;
  Ativo: boolean;
  MotivoRecusa: string;

  Loading: boolean;

  get Sla() {
    return this.SLA || this['sla'];
  }

  setData(data: any): Sla {
    Object.keys(data).forEach(key => {
      try {
        if (key.toUpperCase() === 'SLA') {
          this['sla'] = data[key];
        } else {
          this[key] = data[key];
        }
      } catch (e) {
        console.error(`campo ${key} não encontrado.`);
      }
    });

    return this;
  }

  idEncode() {
    return Helper.idEncode(this.IdSla);
  }

  idDecode(idEncoded: string): number {
    return Number(Helper.idDecode(idEncoded));
  }

  // regras de negocio
  // -----------------------------------------------------------------------------
  get min(): number {
    return 1;
  }

  get max(): number {
    return 50;
  }

  get IdAprovar(): number {
    return 3;
  }

  get IdReprovar(): number {
    return 4;
  }

  isEditable(): boolean {
    // somente slas com status novo podem ser editados
    switch (this.Status) {
      case 'NOVO':
      case 'AGUARDANDO APROVAÇÃO':
        return true;
    }

    switch (this['idStatus']) {
      case 1:
      case 2:
        return true;
    }

    if (this.CanEdit) {
      return true;
    }

    return false;
  }

  canAprove(): boolean {
    return this.Ativo && this.Status === 'AGUARDANDO APROVAÇÃO' || this.CanAprove;
  }

  isReproved() {
    return this.Status === 'REPROVADO';
  }

  toggleAtivaDesativa(): boolean {
    this.Ativo = !this.Ativo;
    return this.Ativo;
  }

  aprovar() {
    this.Status = 'APROVADO';
  }

  reprovar(justificativa: string) {
    this.Status = 'REPROVADO';
    this.MotivoRecusa = justificativa;
  }
}
