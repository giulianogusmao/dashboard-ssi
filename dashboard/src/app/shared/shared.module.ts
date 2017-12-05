import { NgModule } from '@angular/core';

// rxjs
import './rxjs/rxjs-operators';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { AppBootstrapModule } from './bootstrap/index';
import { AlertModule } from './alert/index';
import { NotificationModule } from './notification/index';


@NgModule({
  imports: [
    AppBootstrapModule,
    ReactiveFormsModule,
    AlertModule,
    NotificationModule,
  ],
  exports: [
    AppBootstrapModule,
    ReactiveFormsModule,
    AlertModule,
    NotificationModule,
  ],
})
export class SharedModule { }
