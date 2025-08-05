import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask, ITaskStatusResponse } from '@turbovets-challenge/data/interfaces';
import { environment } from '../../environment';
import { Task } from '@turbovets-challenge/data/entities';
import { CreateTaskDto, UpdateTaskOrderDto } from '@turbovets-challenge/data/dtos';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasksLinked(): Observable<ITaskStatusResponse> {
    return this.http.get<ITaskStatusResponse>(`${this.apiUrl}`);
  }
  
  createTask(dto: CreateTaskDto): Observable<ITask> {
    return this.http.post<ITask>(`${this.apiUrl}`, dto);
}

  updateTaskOrder(dto: UpdateTaskOrderDto, taskId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${taskId}`, {
      newStatus: dto.newStatus,
      newIndex: dto.newIndex
    });
  }

  editTask(id: number, updates: { title: string; description: string }): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${id}`, updates);
  }

  deleteTask(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }

}
