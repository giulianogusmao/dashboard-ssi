import { IArea } from './area.interface';

export interface IUser {
  Id: number;
  Nome: string;
  TipoUsuario: string;
  Areas: IArea[];
}
