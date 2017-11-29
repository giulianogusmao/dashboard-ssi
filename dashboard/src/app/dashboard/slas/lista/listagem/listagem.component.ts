import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
})
export class ListagemComponent implements OnInit {

  @Input() slas;
  constructor() { }

  ngOnInit() {
  }

}
