import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// modules
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';

// routing
import { AppRouting } from './app.routing';

// services
import { AuthService } from './_services/auth.service';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    AppRouting,
    AccountModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
