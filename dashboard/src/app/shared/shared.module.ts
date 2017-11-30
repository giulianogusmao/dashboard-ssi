import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// rxjs
import './rxjs/rxjs-operators';

// modules
import { AppBootstrapModule } from './bootstrap/bootstrap.module';

// components

@NgModule({
  imports: [
    AppBootstrapModule,
    ReactiveFormsModule,
  ],
  exports: [
    AppBootstrapModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
