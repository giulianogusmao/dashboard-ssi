import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export abstract class FormHelper {

  form: FormGroup;

  constructor(
    protected _fb: FormBuilder,
  ) { }

  protected createForm(formControls: any) {
    this.form = this._fb.group(formControls);
  }

  updateItemsSelect(target: string, values: any, controllName: string, frase: string = 'Carregando...', disable: boolean = true) {
    try {
      this[target] = values;
      if (frase && !(this[target].filter(item => item.Id === null)).length) {
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

  // verifica se o campo é inválido
  fieldIsInvalid(campo) {
    try {
      return this.form.get(campo).invalid && (this.form.get(campo).dirty || this.form.get(campo).touched);
    } catch (e) {
      console.warn(`Campo ${campo} não encontrado para ser validado`);
      return false;
    }
  }

  // verifica se o campo é obrigatório
  fieldIsRequired(campo) {
    try {
      return this.form.get(campo).errors['required'] && (this.form.get(campo).dirty || this.form.get(campo).touched);
    } catch (e) {
      return false;
    }
  }

  // marca os campos como tocados para exibir mensagens de validação
  protected markFormTouched() {
    Object.keys(this.form.controls).forEach(campo => {
      this.form.get(campo).markAsDirty();
      this.form.get(campo).markAsTouched();
    });
  }

  // marca os campos como tocados para exibir mensagens de validação
  protected markFormUnTouched() {
    Object.keys(this.form.controls).forEach(campo => {
      this.form.get(campo).markAsPristine();
      this.form.get(campo).markAsUntouched();
    });
  }

  // desabilita todos os campos do formulário
  protected markFormDisabled() {
    Object.keys(this.form.controls).forEach(campo => {
      this.form.get(campo).disable();
    });
  }

  // habilita todos os campos do formulário
  protected markFormEnabled() {
    Object.keys(this.form.controls).forEach(campo => {
      this.form.get(campo).enable();
    });
  }
}
