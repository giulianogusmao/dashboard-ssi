import { NgModule } from '@angular/core';

// rxjs
import './rxjs/rxjs-operators';

// modules
import { AppBootstrapModule } from './bootstrap/bootstrap.module';

// components

@NgModule({
  imports: [
    AppBootstrapModule,
  ],
  exports: [
    AppBootstrapModule,
  ],
})
export class SharedModule { }
