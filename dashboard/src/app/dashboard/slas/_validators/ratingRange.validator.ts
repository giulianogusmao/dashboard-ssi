import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
    return Observable
      .of(c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max))
      .map(result => !!result ? { 'range': true } : null);
  };
}
