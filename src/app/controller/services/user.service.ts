import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private _user: User;
private login: string;
private _urlUser: 'http://localhost:8090/exam-api/user/';

  constructor(private http: HttpClient, private router: Router) { }

  get user(): User {
    if (this._user == null) {
      this._user = new User();
    }
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  public seConnecter(){
    this.http.put<number>('http://localhost:8090/exam-api/user/se-connecter', this.user).subscribe(
      data => {
        if(data === 1){
         // sessionStorage.setItem(this.user.login, this.login);
          this.router.navigateByUrl('/admin')

        }
      }
    )
  }

  public isUserLoggedIn () {
    let user = sessionStorage.getItem (this.user.login)
    console.log (! (user === null))
    return! (user === null)
  }

 public logout() {
    sessionStorage.remo.veItem (this.user.login)
  }

}
