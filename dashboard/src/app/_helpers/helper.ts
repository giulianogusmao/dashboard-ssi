import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { FormGroup } from '@angular/forms/src/model';

export class Helper {

  private static _servers: object = {
    localhost: 'http://localhost:3000/api',
    server: 'http://sla.keysquad.com.br/api',
    assets: 'assets/dados',
  };

  constructor() {
    throw new Error('Class Helper não pode ser instanciada');
  }

  static useFake(): boolean {
    return true;
  }

  static apiUrl(url: string, nameServer: string = 'server'): string {
    if (!this._servers.hasOwnProperty(nameServer)) {
      throw new Error(`Não existe nenhuma referência para o servidor: ${nameServer}`);
    }

    const sr = nameServer === 'assets' ? `${this._servers[nameServer]}${url}.json` : `${this._servers[nameServer]}${url}`;
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

  static markFormTouched(form: FormGroup) {
    // marca os campos como tocados para exibir mensagens de validação
    Object.keys(form.controls).forEach(campo => {
      form.get(campo).markAsDirty();
      form.get(campo).markAsTouched();
    });
  }

  static markFormUnTouched(form: FormGroup) {
    // marca os campos como tocados para exibir mensagens de validação
    Object.keys(form.controls).forEach(campo => {
      form.get(campo).markAsPristine();
      form.get(campo).markAsUntouched();
    });
  }

  static markFormDisabled(form: FormGroup) {
    // desabilita todos os campos do formulário
    Object.keys(form.controls).forEach(campo => {
      form.get(campo).disable();
    });
  }

  static markFormEnabled(form: FormGroup) {
    // habilita todos os campos do formulário
    Object.keys(form.controls).forEach(campo => {
      form.get(campo).enable();
    });
  }
}
