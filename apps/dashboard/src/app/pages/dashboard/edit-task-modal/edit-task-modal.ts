import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask } from '@turbovets-challenge/data/interfaces';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { editTask } from '../../../store/tasks/tasks.actions';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './edit-task-modal.html',
  styleUrl: './edit-task-modal.scss',
})
export class EditTaskModalComponent implements OnChanges {
  store = inject(Store);
  faWindowClose = faTimes;

  @Input() task!: ITask | null;
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
      });
    }
  }

  onSubmit(): void {
    if (!this.task) return;

    this.store.dispatch(
      editTask({
        id: this.task.id,
        updates: {
          title: this.form.value.title!,
          description: this.form.value.description || '',
        },
      })
    );

    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  closeEditTask(): void {
    this.close.emit();
  }
}
