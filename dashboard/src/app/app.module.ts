import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// modules
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';

// guards
import { AuthenticateGuard } from './_guards/index';

// routing
import { AppRouting } from './app.routing';

// services
import { AuthService } from './_services/index';
import { AuthInterceptor } from './_interceptors/index';

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
    HttpClientModule,
    SharedModule,
    AppRouting,
    AccountModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthenticateGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
