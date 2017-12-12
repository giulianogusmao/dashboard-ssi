import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from 'angular2-notifications';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ConfirmSettings } from '@jaspero/ng2-confirmations/src/interfaces/confirm-settings';

import { Sla, ISla } from './../_models/index';
import { SlasSevices } from '../_services/index';
import { AuthService } from '../../../_services/index';
import { User } from '../../../_models/index';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit, OnDestroy {

  columns = [
    // { label: 'ID', value: 'idsla' },
    { label: 'Ativo', value: 'Ativo' },
    { label: 'Status', value: 'Status' },
    { label: 'Área', value: 'NomeArea' },
    { label: 'Complexidade', value: 'Complexidade' },
    { label: 'Prioridade', value: 'Prioridade' },
    { label: 'SLA', value: 'SLA' },
    { label: 'Início da vigência', value: 'InicioVigencia' },
    { label: 'Final da vigência', value: 'FimVigencia' },
  ];

  msgView: string;
  usuario: User = new User();
  paginationSlas: Sla[] = [];
  filteredSlas: Sla[] = [];
  private _slas: ISla[] = [];
  private _inscricoes: Subscription[] = [];

  form: FormGroup;
  private _filter: string = null;

  // pagination
  totalItems = 0;
  currentPage = 0;
  itemsPerPage = 10;
  maxSizeNumPages = 4;

  constructor(
    private _fb: FormBuilder,
    private _slaService: SlasSevices,
    private _authService: AuthService,
    private _notificationService: NotificationsService,
    private _confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this._inscricoes.push(this._authService.user.subscribe(
      user => this.usuario = user,
      err => {
        console.error(err);
      }
    ));

    // instacia form de pesquisa
    this.form = this._fb.group({
      buscar: '',
      coluna: '',
    });

    // carrega slas
    this.loadList();
  }

  desativaSLA(sla: Sla) {
    this._confirmationService
      .create('Desativar SLA', 'Deseja realmente desativar este SLA?')
      .subscribe(
        (res) => {
          if (res.resolved) {
            sla.Loading = true;
            this._slaService
              .toggleAtivaDesativa(sla)
              .subscribe(
                () => {
                  sla.toggleAtivaDesativa();
                  this._notificationService.success('', 'SLA desativado com sucesso!');
                  sla.Loading = false;
                },
                err => {
                  console.error(err);
                  this._notificationService.error('', 'Não foi possível desativar o SLA');
                  sla.Loading = false;
                });
          }
        });
  }

  ativaSLA(sla: Sla) {
    this._confirmationService
      .create('Ativar SLA', 'Deseja realmente ativar este SLA?')
      .subscribe(
      (res) => {
        if (res.resolved) {
          sla.Loading = true;
          this._slaService
            .toggleAtivaDesativa(sla)
            .subscribe(
            () => {
              sla.toggleAtivaDesativa();
              this._notificationService.success('', 'SLA ativado com sucesso!');
              sla.Loading = false;
            },
            err => {
              console.error(err);
              this._notificationService.error('', 'Não foi possível ativar o SLA');
              sla.Loading = false;
            });
        }
      });

  }

  buscar() {
    if (this._slas.length) {
      // salva último filtro aplicado
      this._filter = this.form.value.buscar;

      // caso tenha filtro: filtra lista, senão retorna a lista completa
      const filteredSlas = this._filter
        ? this._filterSlas(this._filter, this.form.value.coluna)
        : this._slas;

      // converte slas retornados para objetos Sla
      this.filteredSlas = filteredSlas.map(sla => new Sla().setData(sla));
      this.totalItems = this.filteredSlas.length;
      this.setPage(1);
    }
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
        let exists = false;

        Object.keys(sla).forEach(key => {
          try {
            if (sla[key].toString().toLocaleLowerCase().indexOf(filterBy) > -1) {
              exists = true;
            }
          } catch (e) { }
        });

        return exists;
      }
    });

    if (!result.length) {
      this.msgView = 'Nenhum valor encontrado';
    }

    return result;
  }

  loadList() {
    this.paginationSlas = [];
    this.filteredSlas = [];
    this._slas = [];
    this.setPage(1);

    this.msgView = 'Carregando SLAs...';

    this._inscricoes.push(this._slaService.getAll()
      .subscribe(slas => {
        if (slas.length) {
          this.msgView = '';
          this._slas = slas;
          this.buscar();
        }
      },
      err => {
        this.msgView = 'Não foi possível carregar a lista';
      }));
  }

  trackById(index, sla: ISla) {
    return sla.IdSla;
  }

  ngOnDestroy() {
    try {
      this._inscricoes.forEach(
        inscricao => inscricao.unsubscribe());
    } catch (e) { }
  }

  // pagination methods
  setPage(pageNo: number): void {
    this.currentPage = pageNo;
    this.pageChanged({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.paginationSlas = this.filteredSlas.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }
}
