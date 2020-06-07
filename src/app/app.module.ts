import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminModule } from './layouts/admin/admin.module';
import { PrintComponent } from './modules/print/print.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {CalendarDateFormatter} from 'angular-calendar';
import {CalendarCreateComponent} from './modules/calendar/calendar-create/calendar-create.component';
import {HomeComponent} from './home';
import {RegisterComponent} from './register';
import {AlertComponent} from './_components';
import {LoginComponent} from './login';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './_helpers';
registerLocaleData(localeFr);





@NgModule({
  declarations: [
    AppComponent,
    PrintComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'},
    {
    provide: CalendarDateFormatter,
    useClass: CalendarCreateComponent,
  },        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
