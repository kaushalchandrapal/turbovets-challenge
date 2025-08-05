import { Component, OnInit, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITask, ITaskStatusResponse } from '@turbovets-challenge/data/interfaces';
import { deleteTaskAction, loadTasks, updateTask } from '../../../store/tasks/tasks.actions';
import { selectTaskStatusResponse } from '../../../store/tasks/tasks.selectors';
import { TaskStatus } from '@turbovets-challenge/data/enums';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule, FontAwesomeModule, EditTaskModalComponent],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  private router = inject(Router);
  private store = inject(Store);
  faPen = faPen;
  faTrash = faTrash;

  taskStatus = TaskStatus;
  taskStatusList = Object.values(TaskStatus); 
  connectedDropLists = this.taskStatusList.map(status => `${status}-list`);

  tasks$: Observable<ITaskStatusResponse | null>;

  showModal = false;
  selectedTask!: ITask;

  constructor() {
    this.tasks$ = this.store.select(selectTaskStatusResponse);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  onDrop(event: CdkDragDrop<any[]>, newStatus: TaskStatus) {
    const task = event.item.data;

    if (!task?.id || event.previousContainer === event.container && event.previousIndex === event.currentIndex) {
      return;
    }

    const newIndex = event.currentIndex;

    this.store.dispatch(updateTask({
      id: task.id,
      updates: {
        newStatus,
        newIndex
      }
    }));
  }

  onSubmit(): void {
    this.router.navigate(['/dashboard/create-task']);
  }

  trackByTaskId(index: number, task: any): number {
    return task.id;
  }

  formatStatus(status: TaskStatus): string {
    return status.replace('_', ' ').toUpperCase();
  }

  editTask(task: ITask): void {
    this.selectedTask = task;
    this.showModal = true;
  }

  onCloseModal(): void {
    this.showModal = false;
  }

  deleteTask(id: number): void {
    this.store.dispatch(deleteTaskAction({ id }));
  }
}
