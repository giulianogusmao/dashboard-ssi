import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

// modules
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';

// guards
import { AuthenticateGuard } from './_guards/index';

// routing
import { AppRouting } from './app.routing';

// services
import { AuthService } from './_services/index';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    AppRouting,
    AccountModule,
  ],
  providers: [
    AuthenticateGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
