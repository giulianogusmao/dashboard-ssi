export interface ISlaEdit {
  IdSla: number;
  idArea: number;
  idComplexidade: number;
  idPrioridade: number;
  idStatus: number;
  SLA: number;
  Ativo: boolean;
  MotivoRecusa?: string;
}
