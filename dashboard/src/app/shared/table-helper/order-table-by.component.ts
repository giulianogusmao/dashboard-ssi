import { SortParams } from './sort-params.model';
import { Component, Input } from '@angular/core';
import { OrderTableByService } from './order-table-by.service';

@Component({
  selector: '[app-order-table]',
  templateUrl: './order-table-by.component.html',
  styleUrls: ['./order-table-by.style.scss'],
})
export class OrderTableByComponent {

  @Input() property: string;
  public sortParamns: SortParams;

  constructor(
    private _orderTableService: OrderTableByService,
  ) {
    this._orderTableService.sortParams.subscribe(
      params => this.sortParamns = params);
  }

  sort(property) {
    this._orderTableService.sort(property);
  }
}
