import { IsString } from 'class-validator';

export class EditTaskDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}