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

  canList(): boolean {
    return this._validAccess([
      'administrador',
      'gestor',
      'suporte',
      'generico',
    ]);
  }

  canEdit(): boolean {
    return this._validAccess([
      'administrador',
      // 'gestor',
      // 'suporte',
      // 'generico',
    ]);
  }

  canInsert(): boolean {
    return this._validAccess([
      'administrador',
      // 'gestor',
      // 'suporte',
      // 'generico',
    ]);
  }

  canDisable(): boolean {
    return this._validAccess([
      'administrador',
      // 'gestor',
      'suporte',
      // 'generico',
    ]);
  }

  canEnable(): boolean {
    return this._validAccess([
      'administrador',
      // 'gestor',
      'suporte',
      // 'generico',
    ]);
  }

  canAprove(): boolean {
    return this._validAccess([
      // 'administrador',
      'gestor',
      // 'suporte',
      // 'generico',
    ]);
  }

  private _validAccess(perfis: Array<string>): boolean {
    if (this.tipoUsuario) {
      if (perfis.indexOf(this.tipoUsuario.toLowerCase()) > -1) {
        return true;
      }
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
