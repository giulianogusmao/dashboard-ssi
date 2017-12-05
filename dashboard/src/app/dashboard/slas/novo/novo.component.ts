import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { Helper } from './../../../_helpers/index';
import { ratingRange } from './../_validators/index';

import { ISla, IArea, IComplexidade } from './../_models/index';
import { SlasSevices, AreasSevices, ComplexidadesService } from '../_services/index';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
})
export class NovoComponent implements OnInit {

  form: FormGroup;
  areas: IArea[] = [];
  areasIsDisabled: boolean;
  complexidades: IComplexidade[] = [];

  btnCadastrar = {
    label: 'Cadastrar',
    labelLoading: 'Salvando...',
    loading: false,
  };

  sla: ISla = <ISla>{};
  slaMin = 1;
  slaMax = 50;

  statusMsgAlert: any;

  constructor(
    private _fb: FormBuilder,
    private _slaService: SlasSevices,
    private _areaService: AreasSevices,
    private _complexidadesService: ComplexidadesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _notificationService: NotificationsService,
  ) { }

  ngOnInit() {
    // cria form
    this._formCreat();
    // carrega campos
    this._loadAreas();
    this._loadComplexidade();

    // verifica se veio id para editar, caso tenha um id, carrega o SLA e instancia no form
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._loadSLAById(id);
      this.btnCadastrar.label = 'Editar';
    } else {
      this.btnCadastrar.label = 'Cadastrar';
    }
  }

  private _formCreat(): void {
    // instância form e define validações
    this.form = this._fb.group({
      area: ['', Validators.required],
      complexidade: ['', Validators.required],
      sla: ['', Validators.required, ratingRange(this.slaMin, this.slaMax)],
      prioridade: ['', Validators.required],
      status: ['', Validators.required],
    });

    // habilita para escutar mudanças no formulário
    this._formOnChange();

    // set valores padrões
    this.formReset();
  }

  private _formOnChange(): void {
    // exibe/oculta alerta quando troca o valor do radio status
    this.form.get('status').valueChanges.subscribe(
      value => {
        if (value === 'novo') {
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
      area: '',
      complexidade: '',
      sla: '',
      prioridade: '',
      status: 'aguardando aprovação',
    });

    // marca todos como não tocados e campos limpos
    Helper.markFormUnTouched(this.form);
  }

  private _loadSLAById(id: string): void {
    Helper.markFormDisabled(this.form);

    this._slaService.getById(id)
      .subscribe(sla => {
        this.sla = sla;
        // atualiza form com valores do sla carregado
        this.form.patchValue({
          area: this.sla.idarea,
          complexidade: this.sla.complexidade,
          sla: this.sla.sla,
          prioridade: this.sla.prioridade,
          status: this.sla.status,
        });

        Helper.markFormEnabled(this.form);
      },
      err => {
        Helper.markFormEnabled(this.form);
        this._notificationService.error('Não foi possível carregar os dados do SLA');
      });
  }

  private _loadAreas() {
    this.form.get('area').disable();
    this.areas = [{ idarea: '', area: 'Carregando...' }];

    this._areaService
      .getAll()
      .subscribe(areas => {
        this.areas = areas;
        this.areas.unshift({ idarea: '', area: 'Selecione uma Área' });
        this.form.get('area').enable();
      });
  }

  private _loadComplexidade() {
    this.form.get('complexidade').disable();
    this.complexidades = [{ id: '', label: 'Carregando...' }];

    this._complexidadesService
      .getAll()
      .subscribe(complexidades => {
        this.complexidades = complexidades;
        this.complexidades.unshift({ id: '', label: 'Selecione o nível de complexidade' });
        this.form.get('complexidade').enable();
      });
  }

  trackByIdArea(index, area) {
    return area.idarea;
  }

  trackByIdComplexidade(index, complexidade) {
    return complexidade.id;
  }

  salvar(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      // marca os campos como tocados para exibir mensagens de validação
      Helper.markFormTouched(this.form);
    } else {
      // block btn cadastrar
      this.btnCadastrar.loading = true;

      this.sla = this._prepareToSave(this.form.value);

      this._slaService.Add(this.sla).subscribe(
        res => {
          this._notificationService.success('', 'SLA Salvo com sucesso!');
          this.btnCadastrar.loading = false;
          this.formReset();
        },
        err => {
          console.error('err');
          this._notificationService.error('', 'Não foi possível cadastrar o SLA');
        }
      );
    }
  }

  private _prepareToSave(val: any): ISla {
    return Object.assign(this.sla, {
      status: val.status,
      complexidade: val.complexidade,
      prioridade: val.prioridade,
      sla: val.sla,
      idarea: val.area,
    });
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
