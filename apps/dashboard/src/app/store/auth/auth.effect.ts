import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthErrorResponse } from '@turbovets-challenge/data/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) => {
        const { email, password } = credentials;
        return this.authService.login(email, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({ response: { access_token: response.access_token } })
          ),
          catchError((error: HttpErrorResponse) => {
            const typedError: IAuthErrorResponse = error.error;
            return of(AuthActions.loginFailure({ error: typedError }));
          })
        );
      })
    )
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.snackBar.open(error?.message.message || 'Login failed!', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action: ReturnType<typeof AuthActions.loginSuccess>) => {
          localStorage.setItem('access_token', action.response.access_token);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ credentials }) => {
        const { name, email, password, role, organizationId } = credentials as unknown as {
          name: string;
          email: string;
          password: string;
          role: string;
          organizationId: string;
        };
        return this.authService
          .register({ name, email, password, role, organizationId })
          .pipe(
            map((res) => AuthActions.registerSuccess({ response: res })),
            catchError((error) =>
              of(AuthActions.registerFailure({ error: error?.message || 'Registration failed' }))
            )
          );
      })
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.snackBar.open('Registration Successful', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );
}
