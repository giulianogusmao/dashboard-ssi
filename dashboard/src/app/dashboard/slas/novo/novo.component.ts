import { Component, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from 'angular2-notifications';

import { Helper, FormHelper } from './../../../_helpers/index';
import { ratingRange } from './../_validators/index';
import { Sla, ISla, ISelect, IParametros, ISlaEdit } from './../_models/index';
import { SlasSevices, AreasService, ParametrosSevices } from '../_services/index';
import { User } from '../../../_models/index';
import { AuthService } from './../../../_services/index';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
})
export class NovoComponent extends FormHelper implements OnInit, OnDestroy {

  usuario: User;

  sla: Sla = new Sla();
  areas: Array<ISelect> = [];
  complexidades: Array<ISelect> = [];
  prioridades: Array<ISelect> = [];
  status: Array<ISelect> = [];

  private _listWaitObservables: Observable<any>[] = [];
  private _subscriptions: Subscription[] = [];

  statusMsgAlert: any;

  loading: boolean;
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
    protected _fb: FormBuilder,
    private _authService: AuthService,
    private _slaService: SlasSevices,
    private _parametrosService: ParametrosSevices,
    private _areasService: AreasService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _notificationService: NotificationsService,
  ) {
    super(_fb);
  }

  ngOnInit() {
    // get usuario
    this._subscriptions.push(this._authService.user.subscribe(
      usuario => this.usuario = usuario));

    // cria form
    this.createForm({
      idArea: [null, Validators.required],
      idComplexidade: [null, Validators.required],
      SLA: [null, Validators.required, ratingRange(this.sla.min, this.sla.max)],
      idPrioridade: [null, Validators.required],
      idStatus: [null, Validators.required],
      Ativo: [null],
      // MotivoRecusa: [null],
    });

    // habilita para escutar mudanças no formulário
    this._formOnChange();

    // carrega campos
    this.loading = true;
    this._listWaitObservables.push(this._loadAreas());
    this._listWaitObservables.push(this._loadParametros());

    // verifica se veio id para editar, caso tenha um id, carrega o SLA e instancia no form
    const id = this._route.snapshot.paramMap.get('id');

    if (id) {
      this._listWaitObservables.push(this._loadSLAById(this.sla.idDecode(id)));
      this._changeActionNovo(false);
    } else {
      this._changeActionNovo();
    }

    // aguarda todos os campos serem carregados e o usuário ser carregado para executar a ação
    this._subscriptions.push(Observable.forkJoin(...this._listWaitObservables).subscribe(() => {
      // atualiza form com valores do sla carregado
      setTimeout(() => {
        this.loading = false;
        this.formReset();

        if (!this.actionNovo) {
          this.markFormEnabled();
          this.formSetValues(this.sla);
        }
      }, 100);
    }, err => {
      this.loading = false;
      console.error(err);
    }));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe());
  }

  private _changeActionNovo(isNovo: boolean = true): void {
    this.actionNovo = isNovo;
    if (this.actionNovo) {
      this.btnCadastrar.label = 'Cadastrar';
      this.btnCadastrar.labelLoading = 'Cadastrando...';
      this.btnCadastrar.msgComplete = 'SLA Cadastrado com sucesso!';
      this.btnCadastrar.msgError = 'Não foi possível realizar o cadastro do SLA.';
    } else {
      this.btnCadastrar.label = 'Salvar';
      this.btnCadastrar.labelLoading = 'Salvando...';
      this.btnCadastrar.msgComplete = 'SLA Editado com sucesso!';
      this.btnCadastrar.msgError = 'Não foi possível salvar as alterações do SLA.';
    }
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
      idArea: null,
      idComplexidade: null,
      SLA: null,
      idPrioridade: null,
      idStatus: 2,
      Ativo: true,
      // MotivoRecusa: '',
    });

    // marca todos como não tocados e campos limpos
    this.markFormUnTouched();
  }

  formSetValues(sla: any): void {
    this.form.patchValue({
      idArea: sla.idArea,
      idComplexidade: sla.idComplexidade,
      SLA: sla.SLA || sla.sla,
      idPrioridade: sla.idPrioridade,
      idStatus: sla.idStatus,
      Ativo: sla.Ativo,
      // MotivoRecusa: sla.MotivoRecusa,
    });
  }

  private _loadSLAById(id: number) {
    this.markFormDisabled();

    const observable = this._slaService.getById(id);

    this._subscriptions.push(observable.subscribe(
      sla => {
        this.sla = new Sla();
        this.sla.setData(sla);
        console.log(this.sla);

        if (!this.sla.IdSla) {
          this._notificationService.error('', 'Não foi possível carregar os dados do SLA');
          return false;
        }
      },
      err => {
        this.markFormEnabled();
        this._notificationService.error('', 'Ops, ocorreu um erro ao tentar carregar o SLA.');
      }
    ));

    return observable;
  }

  private _loadParametros(): Observable<IParametros> {
    const observable = this._parametrosService.list;
    const observableError = this._parametrosService.errors;

    // carregando
    this.updateItemsSelect('complexidades', [], 'idComplexidade');
    this.updateItemsSelect('prioridades', [], 'idPrioridade');
    this.updateItemsSelect('status', [], 'idStatus');

    observable.subscribe(parametros => {
      this.updateItemsSelect('complexidades', parametros.SlaComplexidades, 'idComplexidade', 'Selecione uma complexidade', false);
      this.updateItemsSelect('prioridades', parametros.SlaPrioridades, 'idPrioridade', null, false);
      this.updateItemsSelect('status', parametros.SlaStatus.filter(item => item.isVisibleOnCreate()), 'idStatus', null, false);
      // this.btnCadastrar.disabled = false;
    });

    observableError.subscribe(parametros => {
      try {
        if (parametros.Error) {
          this.loading = false;
          this.btnCadastrar.disabled = true;
          this.updateItemsSelect('complexidades', [], 'idComplexidade', 'Não foi possível carregar as complexidades');
          this.updateItemsSelect('prioridades', [], 'idPrioridade', 'Não foi possível carregar as prioridades');
          this.updateItemsSelect('status', [], 'idStatus', 'Não foi possível carregar os status');
          // this.btnCadastrar.disabled = true;
        }
      } catch (e) {}
    });

    return observable;
  }

  private _loadAreas() {
    const target = 'areas';
    const control = 'idArea';
    // carregando areas
    this.updateItemsSelect(target, [], control);
    const observable = this._areasService.list;

    this._subscriptions.push(observable.subscribe(areas => {
      this.updateItemsSelect(target, areas, control, 'Selecione uma Área', false);
      },
      err => {
        console.error(err);
        this.updateItemsSelect(target, [], control, 'Não foi possível carregar as áreas');
      }
    ));

    return observable;
  }

  trackById(index, item) {
    return item.Id;
  }

  salvar(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      // marca os campos como tocados para exibir mensagens de validação
      this.markFormTouched();
    } else {
      // block btn cadastrar
      this.btnCadastrar.loading = true;

      // atualiza o sla com os dados do formulario
      this.sla.setData(this.form.value);

      if (Helper.useFake) {
        console.log(JSON.stringify(this.sla));
      }

      this._subscriptions.push(this._slaService[this.actionNovo ? 'add' : 'add'](this.sla).subscribe(
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
      ));
    }
  }

}
