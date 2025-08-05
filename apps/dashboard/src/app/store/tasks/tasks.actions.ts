import { createAction, props } from '@ngrx/store';
import { CreateTaskDto } from '@turbovets-challenge/data/dtos';
import { Task } from '@turbovets-challenge/data/entities';
import { TaskStatus } from '@turbovets-challenge/data/enums';
import { ITask, ITaskStatusResponse } from '@turbovets-challenge/data/interfaces';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ response: ITaskStatusResponse }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ task: CreateTaskDto }>()
);

export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: ITask }>()
);

export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: any }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task Order',
  props<{ id: number; updates: { newStatus: TaskStatus; newIndex: number } }>()
);

export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Order Success',
  props<{ taskId: number; newStatus: TaskStatus; newIndex: number }>()
);

export const updateTaskFailure = createAction(
  '[Tasks] Update Task Order Failure',
  props<{ error: any }>()
);

export const deleteTaskAction = createAction(
  '[Tasks] Delete Task',
  props<{ id: number }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ id: number }>()
);

export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: any }>()
);

export const editTask = createAction(
  '[Tasks] Edit Task',
  props<{ id: number; updates: { title: string; description: string } }>()
);

export const editTaskSuccess = createAction(
  '[Tasks] Edit Task Success',
  props<{ task: ITask }>()
);

export const editTaskFailure = createAction(
  '[Tasks] Edit Task Failure',
  props<{ error: any }>()
);