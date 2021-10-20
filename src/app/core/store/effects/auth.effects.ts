import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {createAccountSuccessAction} from '../actions/auth.action';

@Injectable()
export class AuthEffects {

  createAccEffect = createEffect(() => this.actions$.pipe(
      ofType('[Login Page] createAcc'),
      exhaustMap(payload => {
          const username = (payload as any).email;
          const password = (payload as any).password;
          console.log(username, password);
          return this.authService.createNewAcc(username, password)
            .pipe(
              map(user => {
                console.log(user);
                return createAccountSuccessAction(user);
              })
            );
        }
      )
    )
  );

  getUser = createEffect(() => this.actions$.pipe(
    ofType('[Login Page] getUserByTokenAction'),
    exhaustMap(() => this.authService.getUser()
      .pipe(
        map(user => {
          console.log(user);
          return createAccountSuccessAction({user});
        })
      )
    )));

  constructor(
    private authService: AuthService,
    private actions$: Actions
  ) {
  }
}
