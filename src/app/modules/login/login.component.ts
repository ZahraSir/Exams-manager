import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/controller/model/user';
import { UserService } from 'src/app/controller/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  get user(): User{
    return this.userService.user;
  }

  public seConnecter(){
    this.userService.seConnecter();
  }
}
