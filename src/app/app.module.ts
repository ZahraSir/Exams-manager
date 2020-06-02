import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminModule } from './layouts/admin/admin.module';
import { PrintComponent } from './modules/print/print.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {CalendarDateFormatter} from 'angular-calendar';
import {CalendarCreateComponent} from './modules/calendar/calendar-create/calendar-create.component';
registerLocaleData(localeFr);





@NgModule({
  declarations: [
    AppComponent,
    PrintComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'},
    {
    provide: CalendarDateFormatter,
    useClass: CalendarCreateComponent,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
