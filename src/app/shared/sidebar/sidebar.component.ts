import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { User } from 'src/app/controller/model';
import { Role } from 'src/app/controller/model/role';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

menuItems: MenuItem[];
user: User;
  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Salles', icon: 'users-class', routerLink: ['/salles']},
      { label: 'Département', icon: 'fa-home', routerLink: ['/departements']},
      { label: 'Responabilite', icon: 'fa-home', routerLink: ['/responsabilites']},
      { label: 'Professeur', icon: 'fa-home', routerLink: ['/professeurs']},
      { label: 'Surveilant', icon: 'fa-home', routerLink: ['/surveillants']},
      { label: 'Personnel', icon: 'fa-home', routerLink: ['/personels']},
      { label: 'Exam', icon: 'fa-home', routerLink: ['/exams']},
      { label: 'Module', icon: 'fa-home', routerLink: ['/modules']},
      { label: 'Etat', icon: 'fa-home', routerLink: ['/etat']},
      { label: 'Filliere', icon: 'fa-home', routerLink: ['/fillieres']},
      { label: 'Calendar', icon: 'fa-home', routerLink: ['/calendars']}


        ];
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}

}
