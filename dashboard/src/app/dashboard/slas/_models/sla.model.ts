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

  desativa(): boolean {
    this.Ativo = false;
    return this.Ativo;
  }
}
