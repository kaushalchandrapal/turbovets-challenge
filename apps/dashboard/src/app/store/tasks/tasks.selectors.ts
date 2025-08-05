import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './tasks.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskStatusResponse = createSelector(
  selectTaskState,
  (state) => {
    return state.response;
  }
);