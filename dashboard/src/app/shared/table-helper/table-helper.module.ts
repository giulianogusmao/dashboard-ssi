import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrderTableByPipe } from './order-table-by.pipe';
import { OrderTableByService } from './order-table-by.service';
import { OrderTableByComponent } from './order-table-by.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OrderTableByPipe,
    OrderTableByComponent,
  ],
  exports: [
    OrderTableByPipe,
    OrderTableByComponent,
  ],
  providers: [
    OrderTableByService,
  ]
})
export class TableHelperModule { }
