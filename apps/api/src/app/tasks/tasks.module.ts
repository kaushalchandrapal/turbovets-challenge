import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, Task, User } from '@turbovets-challenge/data/entities';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Organization])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
