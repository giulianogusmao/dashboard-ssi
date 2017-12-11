import { ISelect } from './select.interface';

export class Status implements ISelect {
  Id: number;
  Descricao: string;

  constructor(id: number, descricao: string) {
    this.Id = id;
    this.Descricao = descricao;
  }

  isVisibleOnCreate() {
    switch (this.Id) {
      case 1:
      case 2:
        return true;

      default:
        return false;
    }
  }
}
