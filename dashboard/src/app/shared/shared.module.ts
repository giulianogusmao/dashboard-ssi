import { NgModule } from '@angular/core';

// rxjs
import './rxjs/rxjs-operators';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { AppBootstrapModule } from './bootstrap/index';
import { AlertModule } from './alert/index';
import { NotificationModule } from './notification/index';
import { ConfirmationModule } from './confirmation/index';
import { TableHelperModule } from './table-helper/index';

// components
import { LoadingComponent } from './loading/index';


@NgModule({
  imports: [
    AppBootstrapModule,
    ReactiveFormsModule,
    AlertModule,
    NotificationModule,
    ConfirmationModule,
    TableHelperModule,
  ],
  exports: [
    AppBootstrapModule,
    ReactiveFormsModule,
    AlertModule,
    NotificationModule,
    ConfirmationModule,
    TableHelperModule,
    LoadingComponent,
  ],
  declarations: [
    LoadingComponent,
  ]
})
export class SharedModule { }
