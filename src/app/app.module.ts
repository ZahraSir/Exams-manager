import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './layouts/admin/admin.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './modules/home';
import {LoginComponent} from './modules/login';
import {RegisterComponent} from './modules/register';
import {AlertComponent} from './modules/_components';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './modules/_helpers';
import {environment} from '../environments/environment';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AngularFireModule} from '@angular/fire';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {ProfesseursComponent} from './layouts/responsable/professeur/professeur.component';
import {ModulesComponent} from './layouts/responsable/module/module.component';
import {FilieresComponent} from './layouts/responsable/filiere/filiere.component';
import {EtudiantsComponent} from './layouts/responsable/etudiant/etudiant.component';
import {ResponsableComponent} from './layouts/responsable/responsable.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TableModule} from 'primeng/table';
import {FlatpickrModule} from 'angularx-flatpickr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { SalleComponent } from './layouts/responsable/salle/salle.component';
import { AcceuiComponent } from './layouts/responsable/acceui/acceui.component';
import { CalendrierComponent } from './layouts/responsable/calendrier/calendrier.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { CheckboxModule } from 'primeng/checkbox';
import {ExamsComponent} from "./layouts/responsable/exam/exam.component";



registerLocaleData(localeFr);




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ProfesseursComponent,
    ModulesComponent,
    FilieresComponent,
    EtudiantsComponent,
    ResponsableComponent,
    SalleComponent,
    AcceuiComponent,
    CalendrierComponent,
    ExamsComponent

  ],
  imports: [
    CheckboxModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    FormsModule,
    MessagesModule,
    MessageModule,
    TableModule,
    FlatpickrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule,
    FullCalendarModule,
    CheckboxModule
  ],
  providers: [        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
