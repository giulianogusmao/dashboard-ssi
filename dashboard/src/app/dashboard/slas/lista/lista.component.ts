import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ISla } from './../_models/index';
import { Subscription } from 'rxjs/Subscription';
import { SlasSevices } from '../_services/index';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {

  columns = [
    // { label: 'ID', value: 'idsla' },
    { label: 'Ativo', value: 'ativo' },
    { label: 'Status', value: 'status' },
    { label: 'Sigla', value: 'siglaArea' },
    { label: 'Área Requisitada', value: 'area' },
    { label: 'Complexidade', value: 'complexidade' },
    { label: 'Prioridade', value: 'prioridade' },
    { label: 'SLA', value: 'sla' },
    { label: 'Início da vigência', value: 'inicioDaVigencia' },
    { label: 'Final da vigência', value: 'finalDaVigencia' },
  ];

  filteredSlas: ISla[] = [];
  private _slas: ISla[] = [];

  form: FormGroup;
  private _filter: string = null;

  constructor(
    private _fb: FormBuilder,
    private _slaService: SlasSevices,
  ) { }

  ngOnInit() {
    // carrega slas
    this._loadLista();

    // instacia form de pesquisa
    this.form = this._fb.group({
      buscar: '',
      coluna: '',
    });
  }

  buscar() {
    // if (this.form.value.buscar !== this._filter) {
      // salva último filtro aplicado
      this._filter = this.form.value.buscar;
      // caso tenha filtro: filtra lista, senão retorna a lista completa
      this.filteredSlas = this._filter
        ? this._filterSlas(this._filter, this.form.value.coluna)
        : this._slas;
    // }
  }

  reset() {
    this.form.setValue({
      buscar: '',
      coluna: ''
    });

    if (this._filter) {
      this.buscar();
    }
  }

  private _filterSlas(filter: string, column: string): ISla[] {
    const filterBy = filter.toLocaleLowerCase();

    const result = this._slas.filter(sla => {

      if (column) {
        try {
          return sla[column].toString().toLocaleLowerCase().indexOf(filterBy) !== -1;
        } catch (e) {
          console.error(`Coluna ${column} não existe na lista de SLAs`);
          return false;
        }
      } else {
        try {
          let exists = false;

          Object.keys(sla).forEach(key => {
            if (sla[key].toString().toLocaleLowerCase().indexOf(filterBy) !== -1) {
              exists = true;
            }
          });

          return exists;
        } catch (e) {
          return true;
        }
      }
    });

    return result;
  }

  private _loadLista() {
    this._slaService.Listar()
      .subscribe(slas => {
        this._slas = slas;
        this.buscar();
      });
  }

  trackById(index, sla: ISla) {
    return sla.idsla;
  }

}
