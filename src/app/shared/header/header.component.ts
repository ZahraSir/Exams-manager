import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';

import {Router} from '@angular/router';
import {User} from '../../controller/model';
import {AuthenticationService} from '../../controller/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  menuItems: MenuItem[];
  ngOnInit() {
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


  ]; }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
