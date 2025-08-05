import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrganizationService } from '../organization/organization.service';
import {
  loadOrganizations,
  loadOrganizationsSuccess,
  loadOrganizationsFailure
} from './organization.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class OrganizationEffects {
  private actions$ = inject(Actions);
  private organizationService = inject(OrganizationService);
  private snackBar = inject(MatSnackBar);
  
  loadOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizations),
      mergeMap(() =>
        this.organizationService.getAllOrganizations().pipe(
          map((organizations) => {
            return loadOrganizationsSuccess({ organizations });
          }),
          catchError((error) => {
            console.error('Error in effect:', error);
            return of(loadOrganizationsFailure({ error: error.message || 'Unknown error' }));
          })
        )
      )
    )
  );

  loadOrganizationsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadOrganizationsFailure),
        tap((action) => {
          this.snackBar.open(`Failed to load organizations: ${action.error}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        })
      ),
    { dispatch: false }
  );

}
