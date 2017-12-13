import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { FormGroup } from '@angular/forms/src/model';

export class Helper {

  private static _servers: object = {
    localhost: 'http://localhost:6243/api',
    server: 'http://sla.keysquad.com.br/api',
    assets: 'assets/dados',
    zion: 'http://10.126.111.177',
  };

  constructor() {
    throw new Error('Class Helper não pode ser instanciada');
  }

  static useFake(): boolean {
    return false;
  }

  static idEncode(id: number | string): string {
    return btoa(id.toString());
  }

  static idDecode(idEncoded: string): string {
    return atob(idEncoded);
  }

  static apiUrl(url: string, nameServer: string | boolean = 'server'): string {
    let sr = '';

    if (nameServer === false) {
      sr = url;
    } else {
      nameServer = nameServer.toString();
      if (!this._servers.hasOwnProperty(nameServer)) {
        throw new Error(`Não existe nenhuma referência para o servidor: ${nameServer}`);
      }

      sr = nameServer === 'assets' ? `${this._servers[nameServer]}${url}.json` : `${this._servers[nameServer]}${url}`;
    }

    return sr;
  }

  static extractData(response: Response) {
    const body = response.json();
    return body['data'] || {};
  }

  static handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json()['Message'] || 'Server error');
  }
}
