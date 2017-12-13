import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SortParams } from './sort-params.model';

@Injectable()
export class OrderTableByService {

  // order columns
  private _parameters = new SortParams();
  private _subject = new BehaviorSubject<SortParams>(this._parameters);

  sort(property) {
    this._parameters.isDesc = !this._parameters.isDesc;
    this._parameters.column = property;
    this._parameters.direction = this._parameters.isDesc ? 1 : -1;
    this._subject.next(this._parameters);
  }

  get sortParams() {
    return this._subject.asObservable();
  }
}
