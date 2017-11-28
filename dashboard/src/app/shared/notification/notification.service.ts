import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { NotificationModel } from './notificationModel';

@Injectable()
export abstract class NotificationService {

  private _notificacoes: NotificationModel[] = [];

  constructor(
    private _noticationsService: NotificationsService
  ) { }

  private _add(id: string, controller: string): void {
    this._notificacoes.push(new NotificationModel(id, controller));
  }

  private _remove(id: string, controller: string): void {
    this._notificacoes
      .filter(notificacao => {
        if (id) {
          return notificacao.isEquals(id, controller);
        }

        return notificacao.isEqualsController(controller);
      })
      .map(notificacao => this._noticationsService.remove(notificacao.id));
  }

  public success(titulo: string, mensagem: string, controller: string): string {
    const notificacao: object = this._noticationsService.success(titulo, mensagem);
    const id: string = notificacao['id'];
    this._add(id, controller);
    return id;
  }

  public removeId(id: string, controller: string): void {
    this._remove(id, controller);
  }

  public clearController(controller: string): void {
    this._remove(null, controller);
  }
}
