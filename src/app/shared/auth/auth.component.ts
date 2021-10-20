import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Store} from '@ngrx/store';
import {createAccountAction, createAccountSuccessAction} from '../../core/store/actions/auth.action';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  emailFormControl: FormGroup;
  isCreateAcc = true;

  constructor(private formB: FormBuilder,
              private authService: AuthService,
              private store: Store<{}>,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm();
  }


  public initForm(): void {
    this.emailFormControl = this.formB.group({
      email: this.formB.control('', [Validators.email, Validators.required]),
      password: this.formB.control('', [Validators.min(4), Validators.required])
    });
  }

  public login(): void {
    // todo rewrite by ngrx
    this.authService.logIn(this.emailFormControl.value.email, this.emailFormControl.value.password)
      .subscribe(user => {
        if (user) {
          localStorage.setItem('userToken', user.token);
          this.store.dispatch(createAccountSuccessAction({user}));
          this.router.navigateByUrl('/categories');
          this.dialog.closeAll();
        }
      });
  }

  public createAcc(): void {
    this.store.dispatch(createAccountAction({
        email: this.emailFormControl.value.email, password: this.emailFormControl.value.password
      }
    ));
  }


}
