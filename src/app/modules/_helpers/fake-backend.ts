import {User} from '../../controller/model';
﻿import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Role } from 'src/app/controller/model/role';

// array in local storage for registered users
 let users = JSON.parse(localStorage.getItem('users')) || [];
//let users: User[] = [
//{ id: 1, username: 'ADMIN', password: 'admin', firstName: 'ADMIN', lastName: 'ADMIN', role: Role.Admin, email: 'fatmazahrazaizi@gmail.com', departement: '--------'  },
//{ id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, email: 'user@gmail.com', departement: 'chimie' } ];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser();
        case url.match(/\/user\/\d+$/) && method === 'PUT':
          return EditUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        departement: user.departement,
        token: `fake-jwt-token.${user.id}`,
      });
    }
    function register() {
      const user = body

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }
      // assign user id and a few other properties then save
      user.id = newUserId();
      user.dateCreated = new Date().toISOString();
      user.verificationToken = new Date().getTime().toString();
      user.isVerified = false;
      user.refreshTokens = [];
      user.role = Role.User;
      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      delete user.confirmPassword;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function newUserId() {
      return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    function updateUser() {
      if (!isLoggedIn()) return unauthorized();
      let params = body;
      let user = users.find(x => x.id === idFromUrl());
      // only update password if entered
      if (!params.password) {
        delete params.password;
      }
      // update and save user
      Object.assign(user, params);
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }
    function EditUser() {
      if (!isLoggedIn()) return unauthorized();
      let params = body;
      let user = users.find(x => x.id === idFromUrl());
      // update and save user
       Object.assign(user, params);
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }


    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}));
    }

    function isAdmin() {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    function error(message) {
      return throwError({error: {message}});
    }


    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }
    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization').split('.')[1]);
      return users.find(x => x.id === id);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
