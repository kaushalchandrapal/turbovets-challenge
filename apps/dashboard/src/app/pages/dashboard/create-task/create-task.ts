import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateTaskDto } from '@turbovets-challenge/data/dtos';
import { Router } from '@angular/router';
import { createTask } from '../../../store/tasks/tasks.actions';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
})
export class CreateTaskComponent {
  private store = inject(Store);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const newTask: CreateTaskDto = this.form.value;
      this.store.dispatch(createTask({ task: newTask }));
    }
  }
}
