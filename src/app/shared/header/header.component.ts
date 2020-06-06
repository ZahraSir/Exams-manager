import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  menuItems: MenuItem[];

  constructor() { }
  ngOnInit() {    this.menuItems = [
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


  ]; }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
