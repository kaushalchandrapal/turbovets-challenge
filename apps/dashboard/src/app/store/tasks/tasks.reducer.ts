import { createReducer, on } from '@ngrx/store';
import { loadTasks, loadTasksFailure, loadTasksSuccess } from './tasks.actions';
import { ITaskStatusResponse } from '@turbovets-challenge/data/interfaces';

export interface TaskState {
  response: ITaskStatusResponse | null;
  error: any;
}

const initialState: TaskState = {
  response: null,
  error: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({ ...state })),
  on(loadTasksSuccess, (state, { response }) => ({
    ...state,
    response,
    error: null,
  })),
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
