import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';

import {Router} from '@angular/router';
import {User} from '../../controller/model';
import {AuthenticationService, UserService} from '../../controller/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  ngOnInit() {  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
