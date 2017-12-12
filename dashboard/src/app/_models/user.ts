import { IArea } from './area.interface';

export class User {

  private _primeiroNome: string;
  private _ultimoNome: string;

  constructor(
    private _id?: number,
    private _nome?: string,
    private _tipoUsuario?: string,
    private _areas?: IArea[],
  ) {
    this._nome = _nome ? _nome.toLocaleLowerCase() : '';
    this._separaNome(this.nome);
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get tipoUsuario() {
    return this._tipoUsuario;
  }

  get areas() {
    return this._areas;
  }

  get primeiroNome() {
    return this._primeiroNome;
  }

  get ultimoNome() {
    return this._ultimoNome;
  }

  get nomeSobrenome() {
    return `${this.primeiroNome} ${this.ultimoNome}`;
  }

  private _separaNome(nome: string) {
    try {
      const arrayNome = this.nome.split(' ');
      this._primeiroNome = arrayNome[0];

      if (arrayNome.length > 1) {
        this._ultimoNome = arrayNome[arrayNome.length - 1];
      }
    } catch (e) { }
  }

  canDisable(): boolean {
    if (this.tipoUsuario.toLocaleLowerCase() === 'administrador') {
      return true;
    }

    return false;
  }

  canEnable(): boolean {
    if (this.tipoUsuario.toLocaleLowerCase() === 'administrador') {
      return true;
    }

    return false;
  }

  canEdit(): boolean {
    if (this.tipoUsuario.toLocaleLowerCase() === 'administrador') {
      return true;
    }

    return false;
  }

  canAprove(): boolean {
    if (this.tipoUsuario.toLocaleLowerCase() === 'gestor') {
      return true;
    }

    return false;
  }

  toString(): string {
    return JSON.stringify({
      'id': this.id,
      'nome': this.nome,
      'tipoUsuario': this.tipoUsuario,
    });
  }
}
