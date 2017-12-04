import { NgModule } from '@angular/core';

// rxjs
import './rxjs/rxjs-operators';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { AppBootstrapModule } from './bootstrap/index';
import { AlertModule } from './alert/index';

@NgModule({
  imports: [
    AppBootstrapModule,
    ReactiveFormsModule,
    AlertModule,
  ],
  exports: [
    AppBootstrapModule,
    ReactiveFormsModule,
    AlertModule,
  ],
})
export class SharedModule { }
