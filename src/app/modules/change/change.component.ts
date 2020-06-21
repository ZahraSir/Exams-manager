import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService} from '../../controller/services';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(         private formBuilder: FormBuilder,
                       private route: ActivatedRoute,
                       private router: Router,
                       private authenticationService: AuthenticationService,
                       private alertService: AlertService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
      npassword: ['', Validators.required]
  });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  get f() { return this.loginForm.controls; }
 /* onChange() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.changePassword(this.f.username.value, this.f.password.value, this.f.npassword.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigateByUrl('/admin');
        },
        error => {
          this.alertService.error(error);
          this.toastr.error( 'Attention!', 'L\'identifiant ou le mot de passe est incorrect');
          this.loading = false;
        });
  }*/
}
