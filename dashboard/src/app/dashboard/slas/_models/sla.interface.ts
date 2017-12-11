export interface ISla {
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
}
