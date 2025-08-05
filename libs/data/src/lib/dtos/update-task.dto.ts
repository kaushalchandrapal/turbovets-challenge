import { IsEnum, IsInt, Min } from 'class-validator';
import { TaskStatus } from '@turbovets-challenge/data/enums/task-status.enum';

export class UpdateTaskOrderDto {
  @IsEnum(TaskStatus)
  newStatus!: TaskStatus;

  @IsInt()
  @Min(0)
  newIndex!: number;
}
