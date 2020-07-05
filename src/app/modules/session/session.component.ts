import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService, AuthenticationService, UserService} from '../../controller/services';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../controller/model';
import {Departement} from '../../controller/model/departement.model';



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
  ResponseResetForm: FormGroup;
  to: string;
  text: string;
  user = new User();
  id: number;
  isAddMode: boolean;

  constructor(
     private toastr: ToastrService,
     private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private authenticationService: AuthenticationService,
     private userService: UserService,
     private alertService: AlertService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.authenticationService.getDepartement();
    this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
         email: ['', Validators.required],
        departement: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.loadAllUsers();

    this.id = this.user.id;
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.ResponseResetForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      departement: ['', Validators.required]
    });

  }
  get departements(): Array<string> {
    return this.authenticationService.departements;
  }
  get departement(): Departement {
    return this.authenticationService.departement;
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;

      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  // this.users.push(this.registerForm.value)
                this.toastr.success( 'Compte crée avec succés');
                this.loading = false;
              },
              error => {
                  this.alertService.error(error);
                  this.toastr.warning('error', 'Le nom d\'utilisateur est déjà pris!');
                  this.loading = false;
              });
  }
  deleteUser(id: number) {
    this.authenticationService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter(x => x.id !== id);
      });
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
  get ff() { return this.ResponseResetForm.controls; }


 onSubmitEdit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ResponseResetForm.invalid) {
      console.log('form invalide')
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
  updateUser() {
    console.log('hada id' + this.user.id);
    console.log('hada user' + this.user.username);
    this.authenticationService.update(this.user.id, this.ResponseResetForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data' + data);
          // this.router.navigateByUrl('/admin');
        },
        error => {
          console.log('error' + error);
          this.loading = false;
        });
  }
  EditUser(id: number) {
    console.log('hada id' + id);
    console.log('hada form' + this.ResponseResetForm.value);
    console.log('hada user' + this.user.username);
    this.authenticationService.EditUser(id, this.ResponseResetForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data' + data);
          // this.router.navigateByUrl('/admin/session');
        },
        error => {
          console.log('error' + error);
          this.loading = false;
        });
  }
  createUser() {
    this.authenticationService.register(this.ResponseResetForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        error => {

          this.loading = false;
        });
  }
  public recuperer(user: User) {
    console.log(user);
  //  this.ff.id.setValue(user.id);
    this.ff.firstName.setValue(user.firstName);
    this.ff.lastName.setValue(user.lastName);
    this.ff.email.setValue(user.email);
    this.ff.departement.setValue(user.departement) ;
    this.ff.username.setValue(user.username);
    // this.ff.password.setValue(user.password) ;
    console.log('user' + user.lastName);
   // console.log('ff' + this.ff.username);
  }

}
