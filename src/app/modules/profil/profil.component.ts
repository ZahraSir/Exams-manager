import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controller/services/user.service';
import { AuthenticationService } from 'src/app/controller/services';
import { User } from 'src/app/controller/model/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: User;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

}
