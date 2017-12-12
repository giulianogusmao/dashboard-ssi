import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Helper } from '../_helpers/helper';
import { User, IUser, IArea } from '../_models/index';

@Injectable()
export class AuthService {

  private _user = new User();
  private _subjectUser = new BehaviorSubject<User>(this._user);

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
  ) { }

  login(username: string, password: string): Observable<IUser> {
    if (Helper.useFake()) {
      const result = {
        Id: 506,
        Nome: 'EZIO H SOUZA FILHO',
        TipoUsuario: 'Administrador',
        // TipoUsuario: 'Gestor',
        Areas: [
          {
            ID: 832,
            Nome: 'GINFO_DESENV'
          },
          {
            ID: 965,
            Nome: 'GINFO_ETL_WEBFOCUS'
          },
          {
            ID: 886,
            Nome: 'GINFO_INDICADORES_SSI'
          },
          {
            ID: 966,
            Nome: 'GINFO_INFORMES_WEBFOCUS'
          },
          {
            ID: 887,
            Nome: 'GINFO_MAPA_MUDANCAS_SSI'
          },
          {
            ID: 877,
            Nome: 'GINFO_PORTAL_CMD'
          },
          {
            ID: 882,
            Nome: 'GINFO_PORTAL_COCKPIT_TX'
          },
          {
            ID: 878,
            Nome: 'GINFO_PORTAL_CORE'
          },
          {
            ID: 884,
            Nome: 'GINFO_PORTAL_CORE_DADOS'
          },
          {
            ID: 883,
            Nome: 'GINFO_PORTAL_DESEMP_BBIP'
          },
          {
            ID: 881,
            Nome: 'GINFO_PORTAL_DESEMP_RF'
          },
          {
            ID: 888,
            Nome: 'GINFO_PORTAL_DESEMPENHO'
          },
          {
            ID: 879,
            Nome: 'GINFO_PORTAL_PLANEJ_REDES'
          },
          {
            ID: 880,
            Nome: 'GINFO_PORTAL_PLANEJ_RF'
          },
          {
            ID: 885,
            Nome: 'GINFO_PORTAL_UNICO'
          },
          {
            ID: 834,
            Nome: 'GINFO_WEBFOCUS'
          }
        ]
      };
      const user = new BehaviorSubject<IUser>(<IUser>result);
      user.subscribe(usuario => this._setAuthenticate(usuario));
      return user.asObservable();
    }

    return this._httpClient
      .get<IUser>(Helper.apiUrl('/Pessoa'))
      .do((data) => {
        try {
          if (data.Id) {
            this._setAuthenticate(data);
          }
        } catch (e) {
          console.error(e);
          throw new Error('Não foi possível identificar o usuário logado');
        }
      });
  }

  logout(): void {
    if (this.isAuthenticated) {
      this._setAuthenticate();
    }
  }

  // retorna observable com os dados do usuario logado
  get user(): Observable<User> {
    this._createUser(JSON.parse(localStorage.getItem('currentUser')));
    return this._subjectUser.asObservable();
  }

  // verifica se o usuário está autenticado
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // retorna a instancia do usuario logado, caso não tenha, cria uma nova instância
  private _createUser(user: IUser): User {
    if (!this._user.id) {
      this._user = new User(user.Id, user.Nome, user.TipoUsuario, user.Areas);
      this._subjectUser.next(this._user);
    }

    return this._user;
  }

  // grava/limpa os dados do usuario logado
  private _setAuthenticate(user?: IUser) {
    if (user && user.Id) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      this._user = new User();
      this._subjectUser.next(this._user);
    }
  }
}
