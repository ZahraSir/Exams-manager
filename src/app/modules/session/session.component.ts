import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService, AuthenticationService, UserService} from '../../controller/services';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../controller/model';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  currentUser: User;
  users = [];

  constructor(
     private toastr: ToastrService,
     private formBuilder: FormBuilder,
     private router: Router,
     private authenticationService: AuthenticationService,
     private userService: UserService,
     private alertService: AlertService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.loadAllUsers();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
    
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  //this.users.push(this.registerForm.value)
                this.toastr.success( 'Compte crée avec succés');
                this.loading = false;
              },
              error => {
                  this.alertService.error(error);
                  this.toastr.warning('error', 'Le nom d\'utilisateur est déjà pris!');
                  this.loading = false;
              });
  }
  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
}

deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
}
}
