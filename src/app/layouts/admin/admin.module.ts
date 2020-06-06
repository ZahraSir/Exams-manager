import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './admin.component';
import { SallesComponent } from 'src/app/modules/salles/salles.component';
import { DepartementComponent } from 'src/app/modules/departement/departement.component';
import { HttpClientModule } from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ProfesseurComponent} from '../../modules/professeur/professeur.component';
import {ResponsabiliteComponent} from '../../modules/responsabilite/responsabilite.component';
import {SurveillantComponent} from '../../modules/surveillant/surveillant.component';
import {BrowserModule} from '@angular/platform-browser';
import {ExamComponent} from '../../modules/exam/exam.component';
import {ModuleComponent} from '../../modules/module/module.component';
import {EtatComponent} from '../../modules/etat/etat.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import {FiliereComponent} from '../../modules/filiere/filiere.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {CalendarComponent} from '../../modules/calendar/calendar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EtudiantComponent} from '../../modules/etudiant/etudiant.component';
import {ModuleCreateComponent} from '../../modules/module/module-create/module-create.component';
import {CalendarCreateComponent} from '../../modules/calendar/calendar-create/calendar-create.component';
import {CalendarListComponent} from '../../modules/calendar/calendar-list/calendar-list.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FullCalendarModule} from 'ng-fullcalendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {PersonnelComponent} from '../../modules/personnel/personnel.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from 'src/app/modules/login/login.component';


@NgModule({
  declarations: [
    AdminComponent,
    SallesComponent,
    DepartementComponent,
    ProfesseurComponent,
    ResponsabiliteComponent,
    SurveillantComponent,
    ExamComponent,
    ModuleComponent,
    EtatComponent,
    FiliereComponent,
    CalendarComponent,
    EtudiantComponent,
    ModuleCreateComponent,
    CalendarCreateComponent,
    CalendarListComponent,
    PersonnelComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ButtonsModule.forRoot(),
    Ng2SearchPipeModule,
    BrowserModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    RadioButtonModule,
    NgMultiSelectDropDownModule.forRoot(),
    FullCalendarModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ]
})
export class AdminModule { }
