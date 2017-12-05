import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
// import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    // BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    // ModalModule.forRoot()
  ],
  exports: [
    // BsDropdownModule,
    TooltipModule,
    AlertModule,
    // ModalModule,
  ]
})
export class AppBootstrapModule { }
