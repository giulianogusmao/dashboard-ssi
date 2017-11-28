export class Helper {

  private static _servers: object = {
    localhost: 'localhost:3000/api',
    external: '/api',
    assets: 'assets/dados',
  };

  constructor() {
    throw new Error('Class Helper não pode ser instanciada');
  }

  static apiUrl(url: string, nameServer: string = 'localhost'): string {
    if (!this._servers.hasOwnProperty(nameServer)) {
      throw new Error(`Não existe nenhuma referência para o servidor: ${nameServer}`);
    }

    const sr = nameServer === 'assets' ? `${this._servers[nameServer]}${url}.json` : `http://${this._servers[nameServer]}${url}`;
    return sr;
  }
}
