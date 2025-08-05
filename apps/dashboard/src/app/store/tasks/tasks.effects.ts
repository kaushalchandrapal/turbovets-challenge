import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from './tasks.service';
import * as TaskActions from './tasks.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasksLinked().pipe(
          map((response) => TaskActions.loadTasksSuccess({ response })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  );

  loadTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.loadTasksFailure),
        tap(() => {
          this.snackBar.open('Failed to load tasks.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        })
      ),
    { dispatch: false }
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap(({ task }) =>
        this.taskService.createTask(task).pipe(
          tap(() => this.router.navigate(['/dashboard/tasks'])),
          map((createdTask) =>
            TaskActions.createTaskSuccess({ task: createdTask })
          ),
          catchError((error) =>
            of(TaskActions.createTaskFailure({ error }))
          )
        )
      )
    )
  );

  createTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.createTaskSuccess),
        tap(() => {
          this.snackBar.open('Task created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        })
      ),
    { dispatch: false }
  );

  createTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.createTaskFailure),
        tap(() => {
          this.snackBar.open('Failed to create task.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        })
      ),
    { dispatch: false }
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ id, updates }) =>
        this.taskService.updateTaskOrder({
          newStatus: updates.newStatus,
          newIndex: updates.newIndex
        }, id).pipe(
          mergeMap(() => [
            TaskActions.updateTaskSuccess({
              taskId: id,
              newStatus: updates.newStatus,
              newIndex: updates.newIndex
            }),
            TaskActions.loadTasks()
          ]),
          catchError((error) =>
            of(TaskActions.updateTaskFailure({ error }))
          )
        )
      )
    )
  );

  updateTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.updateTaskFailure),
        tap(() => {
          this.snackBar.open('Failed to reorder task.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        })
      ),
    { dispatch: false }
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTask),
      mergeMap(({ id, updates }) =>
        this.taskService.editTask(id, updates).pipe(
          mergeMap((task) => [
            TaskActions.editTaskSuccess({ task }),
            TaskActions.loadTasks()
          ]),
          catchError((error) =>
            of(TaskActions.editTaskFailure({ error }))
          )
        )
      )
    )
  );

  editTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.editTaskSuccess),
        tap(() => {
          this.snackBar.open('Task updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        })
      ),
    { dispatch: false }
  );

  editTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.editTaskFailure),
        tap(() => {
          this.snackBar.open('Failed to update task.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        })
      ),
    { dispatch: false }
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTaskAction),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          mergeMap(() => [
            TaskActions.deleteTaskSuccess({ id }),
            TaskActions.loadTasks()
          ]),
          catchError((error) =>
            of(TaskActions.deleteTaskFailure({ error }))
          )
        )
      )
    )
  );

  deleteTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTaskSuccess),
        tap(() => {
          this.snackBar.open('Task deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-sucess']
          });
        })
      ),
    { dispatch: false }
  );

  deleteTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTaskFailure),
        tap(() => {
          this.snackBar.open('Failed to delete task.', 'Close', {
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