import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/controller/model';
import { UserService, AuthenticationService } from 'src/app/controller/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

  constructor(private userService: UserService,  private authenticationService: AuthenticationService, private router: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
   }
  currentUser: User;
  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
