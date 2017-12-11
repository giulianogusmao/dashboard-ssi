import { Component, Input } from '@angular/core';
import { Sla } from './../_models/index';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
})
export class DetalheComponent {

  @Input() sla: Sla = new Sla();

  constructor() { }
}
