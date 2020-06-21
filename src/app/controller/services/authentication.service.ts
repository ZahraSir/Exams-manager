import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';





@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private _urlemail = 'http://localhost:8090/exam-api/sendemail/';
  constructor(private http: HttpClient, private afAuth: AngularFireAuth,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/');
  }

  public  sendSimpleMessage( to: string, subject: string, text: string) {
    this.http.post(this._urlemail + 'send/to/' + to + '/subject/' + subject + '/text/' + text, this.currentUser).subscribe(
      data => {
        if (data > 0) {
          console.log('ouii ');
        }
        console.log('nonnnn');
      });
  }


  update(id, params) {
    return this.http.put(`/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.currentUserValue.id) {
          // update local storage
          const user = { ...this.currentUserValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.currentUserSubject.next(user);
        }
        return x;
      }));
  }
  resetPassword({ token, password, confirmPassword }) {
    return this.http.post(`/reset-password`, { token, password, confirmPassword });
  }
  getById(id: number) {
    return this.http.get<User>(`/users/${id}`);
  }
  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`).pipe(map(x => {
      if (id === this.currentUserSubject.value.id){
        this.logout();
      }
      console.log('deletedd');
      return x;
    }));
  }

}
