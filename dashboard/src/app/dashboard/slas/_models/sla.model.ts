import { ISla } from './sla.interface';

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

  setData(data: ISla): Sla {
    Object.keys(data).forEach(key => {
      try {
        if (data[key]) {
          this[key] = data[key];
        }
      } catch (e) {
        console.error(`campo ${key} não encontrado.`);
      }
    });

    return this;
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
    return this.Ativo && (this.Status === 'NOVO' || this.CanEdit);
  }

  canAprove(): boolean {
    return this.Ativo && (this.CanAprove || this.Status === 'AGUARDANDO APROVAÇÃO');
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
