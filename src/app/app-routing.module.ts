import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { SallesComponent } from './modules/salles/salles.component';
import { DepartementComponent } from './modules/departement/departement.component';
import { PrintComponent } from './modules/print/print.component';
import {ProfesseurComponent} from './modules/professeur/professeur.component';
import {SurveillantComponent} from './modules/surveillant/surveillant.component';
import {ResponsabiliteComponent} from './modules/responsabilite/responsabilite.component';
import {ExamComponent} from './modules/exam/exam.component';
import {EtatComponent} from './modules/etat/etat.component';
import {FiliereComponent} from './modules/filiere/filiere.component';
import {CalendarComponent} from './modules/calendar/calendar.component';
import {EtudiantComponent} from './modules/etudiant/etudiant.component';
import {ModuleCreateComponent} from './modules/module/module-create/module-create.component';
import {PersonnelComponent} from './modules/personnel/personnel.component';
import {HomeComponent} from './modules/home';
import {LoginComponent} from './modules/login';
import {RegisterComponent} from './modules/register';
import {AuthGuard} from './modules/_helpers';





const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {path: 'salles', component: SallesComponent},
      {path: 'departements', component: DepartementComponent},
      {path: 'professeurs', component: ProfesseurComponent},
      {path: 'surveillants', component: SurveillantComponent},
      {path: 'responsabilites', component: ResponsabiliteComponent},
      {path: 'exams', component: ExamComponent},
      {path: 'modules', component: ModuleCreateComponent},
      {path: 'etat', component: EtatComponent},
      {path: 'fillieres', component: FiliereComponent},
      {path: 'calendars', component: CalendarComponent},
      {path: 'etudiants', component: EtudiantComponent},
      {path: 'personnels', component: PersonnelComponent}
    ]},
  {path: 'print', component: PrintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

