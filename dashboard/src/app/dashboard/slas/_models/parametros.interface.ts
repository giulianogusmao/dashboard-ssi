import { ISelect } from './select.interface';
import { Status } from './status.model';

export interface IParametros {
  SlaComplexidades: ISelect[];
  SlaPrioridades: ISelect[];
  SlaStatus: Status[];
}
