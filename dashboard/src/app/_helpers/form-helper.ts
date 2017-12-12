import { FormGroup } from '@angular/forms/src/model';

export abstract class FormHelper {

  fieldIsInvalid(form: FormGroup, campo) {
    return form.get(campo).invalid && (form.get(campo).dirty || form.get(campo).touched);
  }

  fieldIsRequired(form: FormGroup, campo) {
    try {
      return form.get(campo).errors.required && (form.get(campo).dirty || form.get(campo).touched);
    } catch (e) {
      return false;
    }
  }
}
