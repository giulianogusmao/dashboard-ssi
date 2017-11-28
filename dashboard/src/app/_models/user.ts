export class User {

  private _primeiroNome: string;
  private _ultimoNome: string;

  constructor(
    private _nome: string,
    private _perfil: string,
    private _login: string,
    private _token: string,
  ) {
    this.separaNome(this.nome);
  }

  get token() {
    return this._token;
  }

  get nome() {
    return this._nome;
  }

  get perfil() {
    return this._perfil;
  }

  get login() {
    return this._login;
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

  separaNome(nome: string) {
    try {
      const arrayNome = this.nome.split(' ');
      this._primeiroNome = arrayNome[0];

      if (arrayNome.length > 1) {
        this._ultimoNome = arrayNome[arrayNome.length - 1];
      }
    } catch (e) { }
  }

  toString() {
    return JSON.stringify({
      'nome': this.nome,
      'perfil': this.perfil,
      'login': this.login,
      'token': this.token,
    });
  }
}
