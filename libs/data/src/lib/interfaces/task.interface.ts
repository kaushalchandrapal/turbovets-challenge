import { User } from "../entities";
import { TaskStatus } from "../enums";


export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  order: number;
  createdBy: User;
}

export interface ITaskStatusResponse {
  [TaskStatus.PENDING]: ITask[];
  [TaskStatus.IN_PROGRESS]: ITask[];
  [TaskStatus.DONE]: ITask[];
}