import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { SallesComponent } from './modules/salles/salles.component';
import { DepartementComponent } from './modules/departement/departement.component';
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
import { AuthGuard } from './modules/_helpers/auth.guard';
import { SessionComponent } from './modules/session/session.component';
import { ProfilComponent } from './modules/profil/profil.component';
import {Role} from './controller/model/role';
import { ResponsableComponent } from './layouts/responsable/responsable.component';
import {ProfesseursComponent} from './layouts/responsable/professeur/professeur.component';
import {FilieresComponent} from './layouts/responsable/filiere/filiere.component';
import {EtudiantsComponent} from './layouts/responsable/etudiant/etudiant.component';
import {SalleComponent} from './layouts/responsable/salle/salle.component';
import {AcceuilComponent} from './modules/acceuil/acceuil.component';
import {AcceuiComponent} from './layouts/responsable/acceui/acceui.component';
import {ModulesComponent} from './layouts/responsable/module/module.component';








const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {path: 'admin', component: AdminComponent, data: {roles: [Role.Admin] }, canActivate: [AuthGuard],
    children: [
      {path: '', component: AcceuilComponent},
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
      {path: 'personnels', component: PersonnelComponent},
      {path: 'sessions', component: SessionComponent},
      {path: 'profil/:id', component: ProfilComponent},
      {path: 'edit/:id', component: SessionComponent}
    ]},
  {path: 'responsable', component: ResponsableComponent, data: {roles: [Role.User] }, canActivate: [AuthGuard],   children: [
      {path: '', component: AcceuiComponent},
      {path: 'salles', component: SalleComponent},
      {path: 'professeurs', component: ProfesseursComponent},
      {path: 'surveillants', component: SurveillantComponent},
      {path: 'modules', component: ModulesComponent},
      {path: 'fillieres', component: FilieresComponent},
      {path: 'calendars', component: CalendarComponent},
      {path: 'etudiants', component: EtudiantsComponent},
      {path: 'profil/:id', component: ProfilComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

