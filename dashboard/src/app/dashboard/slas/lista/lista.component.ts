import { Component, OnInit } from '@angular/core';

import { ISla } from './../_models/index';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {

  lista: ISla[] = [
    <ISla>{
      idsla: 'asdfas123',
      ativo: true,
      status: 'novo',
      sla: 15,
      prioridade: 'Urgente',
      complexidade: 'Baixa',
      inicioDaVigencia: '01/09/2017',
      finalDaVigencia: '',
      area: 'Diretoria de Redes',
      siglaArea: 'DR',
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
