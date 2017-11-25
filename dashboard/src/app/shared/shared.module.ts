import { NgModule } from '@angular/core';

// rxjs
import './rxjs/rxjs-operators';

// modules
import { AppBootstrapModule } from './bootstrap/bootstrap.module';
import { NotificationModule } from './notification/notification.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components

@NgModule({
  imports: [
    AppBootstrapModule,
    NotificationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
  ],
  exports: [
    AppBootstrapModule,
    NotificationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
