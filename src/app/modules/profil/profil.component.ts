import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controller/services/user.service';
import {AlertService, AuthenticationService} from 'src/app/controller/services';
import { User } from 'src/app/controller/model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: User;
  ResponseResetForm: FormGroup;
  to: string;
  text: string;
  user: User;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
      password: ['', passwordValidators]
    });

    if (!this.isAddMode) {
      this.authenticationService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.f.firstName.setValue(x.firstName);
          this.f.email.setValue(x.email);
          this.f.lastName.setValue(x.lastName);
          this.f.username.setValue(x.username);
        });
    }
  }
  get f() { return this.ResponseResetForm.controls; }


  onSubmit() {
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
    this.authenticationService.update(this.id, this.ResponseResetForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data' + data);
          this.router.navigateByUrl('/admin');
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



}
