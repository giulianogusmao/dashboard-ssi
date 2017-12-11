import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NotificationsService } from 'angular2-notifications';

import { Helper } from './../../../_helpers/index';
import { ratingRange } from './../_validators/index';
import { Sla, ISla, ISelect, IParametros } from './../_models/index';
import { SlasSevices, AreasService, ParametrosSevices } from '../_services/index';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
})
export class NovoComponent implements OnInit {

  sla: Sla = new Sla();
  form: FormGroup;
  areas: Array<ISelect> = [];
  complexidades: Array<ISelect> = [];
  prioridades: Array<ISelect> = [];
  status: Array<ISelect> = [];

  private _listWaitObservables: Observable<any>[] = [];

  statusMsgAlert: any;

  actionNovo: boolean;
  btnCadastrar = {
    label: '',
    labelLoading: '',
    msgComplete: '',
    msgError: '',
    loading: false,
    disabled: false,
  };

  constructor(
    private _fb: FormBuilder,
    private _slaService: SlasSevices,
    private _parametrosService: ParametrosSevices,
    private _areasService: AreasService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _notificationService: NotificationsService,
  ) { }

  ngOnInit() {
    // cria form
    this._formCreat();
    // carrega campos
    this._listWaitObservables.push(this._loadAreas());
    this._listWaitObservables.push(this._loadParametros());

    // verifica se veio id para editar, caso tenha um id, carrega o SLA e instancia no form
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._loadSLAById(id);
      this._changeActionNovo(false);
    } else {
      this._changeActionNovo();
    }
  }

  private _changeActionNovo(isNovo: boolean = true): void {
    this.actionNovo = isNovo;
    if (this.actionNovo) {
      this.btnCadastrar.label = 'Cadastrar';
      this.btnCadastrar.labelLoading = 'Cadastrando...';
      this.btnCadastrar.msgComplete = 'SLA Cadastrado com sucesso!';
      this.btnCadastrar.msgError = 'Não foi possível realizar o cadastro do SLA.';
    } else {
      this.btnCadastrar.label = 'Editar';
      this.btnCadastrar.labelLoading = 'Salvando...';
      this.btnCadastrar.msgComplete = 'SLA Editado com sucesso!';
      this.btnCadastrar.msgError = 'Não foi possível salvar as alterações do SLA.';
    }
  }

  private _formCreat(): void {
    // instância form e define validações
    this.form = this._fb.group({
      idArea: [null, Validators.required],
      idComplexidade: [null, Validators.required],
      sla: [null, Validators.required, ratingRange(this.sla.min, this.sla.max)],
      idPrioridade: [null, Validators.required],
      idStatus: [null, Validators.required],
    });

    // habilita para escutar mudanças no formulário
    this._formOnChange();

    // set valores padrões
    this.formReset();
  }

  private _formOnChange(): void {
    // exibe/oculta alerta quando troca o valor do radio status
    this.form.get('idStatus').valueChanges.subscribe(
      value => {
        if (value === 1) {
          this.statusMsgAlert = this._sanitizer.sanitize(SecurityContext.HTML, `<strong>Atenção</strong>:
             SLAs definidos como <strong>Novo</strong> não entraram na fila de espera para serem aprovados pelo Gestor.`);
        } else {
          this.statusMsgAlert = '';
        }
      });
  }

  formReset(): void {
    // define valores padrões do form
    this.form.setValue({
      idArea: '',
      idComplexidade: '',
      sla: '',
      idPrioridade: '',
      idStatus: 2,
    });

    // marca todos como não tocados e campos limpos
    Helper.markFormUnTouched(this.form);
  }

  private _loadSLAById(id: string): void {
    // desabilita form
    // Helper.markFormDisabled(this.form);

    // const observable = this._slaService.getById(id);

    // observable.subscribe(
    //   sla => {
    //     this.sla = new Sla();
    //     this.sla.setData(sla);

    //     if (!this.sla.idsla) {
    //       this._notificationService.error('', 'Não foi possível carregar os dados do SLA');
    //       return false;
    //     }
    //   },
    //   err => {
    //     Helper.markFormEnabled(this.form);
    //     this._notificationService.error('', 'Ops, ocorreu um erro ao tentar carregar o SLA.');
    //   }
    // );

    // // aguarda todos os campos serem carregados e o usuário ser carregado para executar a ação
    // Observable.forkJoin(...this._listWaitObservables, observable).subscribe(() => {
    //   // atualiza form com valores do sla carregado
    //   this.form.patchValue({
    //     area: this.sla.Id,
    //     complexidade: this.sla.complexidade,
    //     sla: this.sla.sla,
    //     prioridade: this.sla.prioridade,
    //     status: this.sla.status,
    //   });

    //   // caso seja permetido a edição, habilita o formulário
    //   if (this.sla.isEditable()) {
    //     Helper.markFormEnabled(this.form);
    //   } else {
    //     Helper.markFormDisabled(this.form);
    //     this._notificationService.error('Acesso Negado', 'Este SLA não pode ser Editado!', { timeOut: 0 });
    //   }
    // });
  }

  private _loadParametros(): Observable<IParametros> {
    const observable = this._parametrosService.list;
    const observableError = this._parametrosService.errors;

    // carregando
    this._updateItemsSelect('complexidades', [], 'idComplexidade');
    this._updateItemsSelect('prioridades', [], 'idPrioridade');
    this._updateItemsSelect('status', [], 'idStatus');

    observable.subscribe(parametros => {
      this._updateItemsSelect('complexidades', parametros.SlaComplexidades, 'idComplexidade', 'Selecione uma complexidade', false);
      this._updateItemsSelect('prioridades', parametros.SlaPrioridades, 'idPrioridade', null, false);
      this._updateItemsSelect('status', parametros.SlaStatus, 'idStatus', null, false);
      // this.btnCadastrar.disabled = false;
    });

    observableError.subscribe(parametros => {
      try {
        if (parametros.Error) {
          this._updateItemsSelect('complexidades', [], 'idComplexidade', 'Não foi possível carregar as complexidades');
          this._updateItemsSelect('prioridades', [], 'idPrioridade', 'Não foi possível carregar as prioridades');
          // this._updateItemsSelect('status', [], 'idStatus', 'Não foi possível carregar os status');
          // this.btnCadastrar.disabled = true;
        }
      } catch (e) { }
    });

    return observable;
  }

  private _loadAreas() {
    const target = 'areas';
    const control = 'idArea';
    // carregando areas
    this._updateItemsSelect(target, [], control);
    const observable = this._areasService.list;

    observable.subscribe(areas =>
      this._updateItemsSelect(target, areas, control, 'Selecione uma Área', false),
      err => {
        console.error(err);
        this._updateItemsSelect(target, [], control, 'Não foi possível carregar as áreas');
      }
    );

    return observable;
  }

  private _updateItemsSelect(target: string, values: any, controllName: string, frase: string = 'Carregando...', disable: boolean = true) {
    try {
      this[target] = values;
      if (frase) {
        this[target].unshift({ Id: null, Descricao: frase });
      }
      const ctrl = this.form.get(controllName);

      if (disable) {
        ctrl.disable();
      } else {
        ctrl.enable();
      }
    } catch (e) { }
  }

  trackById(index, item) {
    return item.Id;
  }

  salvar(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      // marca os campos como tocados para exibir mensagens de validação
      Helper.markFormTouched(this.form);
    } else {
      // block btn cadastrar
      this.btnCadastrar.loading = true;

      // atualiza o sla com os dados do formulario
      this.sla.setData(<ISla>this.form.value);
      if (Helper.useFake) {
        console.log(JSON.stringify(this.sla));
      }

      this._slaService.add(this.sla).subscribe(
        res => {
          this._notificationService.success('', this.btnCadastrar.msgComplete);
          this.btnCadastrar.loading = false;
          this.formReset();
        },
        err => {
          console.error(err);
          this._notificationService.error('', this.btnCadastrar.msgError);
          this.btnCadastrar.loading = false;
        }
      );
    }
  }

  fieldIsInvalid(campo) {
    return this.form.get(campo).invalid && (this.form.get(campo).dirty || this.form.get(campo).touched);
  }

  fieldIsRequired(campo) {
    try {
      return this.form.get(campo).errors.required && (this.form.get(campo).dirty || this.form.get(campo).touched);
    } catch (e) {
      return false;
    }
  }

}
