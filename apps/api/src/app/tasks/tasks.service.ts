import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@turbovets-challenge/data/entities/task.entity';
import { User } from '@turbovets-challenge/data/entities/user.entity';
import { Organization } from '@turbovets-challenge/data/entities/organization.entity';
import { TaskStatus } from '@turbovets-challenge/data/enums/task-status.enum';
import { CreateTaskDto } from '@turbovets-challenge/data/dtos/create-task.dto';
import { EditTaskDto } from '@turbovets-challenge/data/dtos';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Organization) private orgRepo: Repository<Organization>
  ) {}

  async createTask(dto: CreateTaskDto, userId: number, orgId: number): Promise<Task> {
    const user = await this.userRepo.findOneByOrFail({ id: userId });
    const org = await this.orgRepo.findOneByOrFail({ id: orgId });

    const status = TaskStatus.PENDING;

    const maxOrder = await this.taskRepo
      .createQueryBuilder('task')
      .where('task.status = :status AND task.organizationId = :orgId', { status, orgId })
      .select('MAX(task.order)', 'max')
      .getRawOne();

    const order = (maxOrder?.max != null && maxOrder?.max != 0) ? Number(maxOrder.max) + 1 : 0;

    const task = this.taskRepo.create({
      title: dto.title,
      description: dto.description,
      status,
      createdBy: user,
      organization: org,
      order,
    });

    return this.taskRepo.save(task);
  }

  async getAllTasksByStatus(
    userId: number,
    organizationId: number
  ): Promise<Record<string, Task[]>> {
    const statuses: TaskStatus[] = [
      TaskStatus.PENDING,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    const result: Record<string, Task[]> = {};

    for (const status of statuses) {
      const tasks = await this.taskRepo.find({
        where: {
          status,
          createdBy: { id: userId },
          organization: { id: organizationId },
        },
        order: { order: 'ASC' },
      });
      result[status] = tasks;
    }

    return result;
  }

  async updateTask(taskId: number, newStatus: TaskStatus, newIndex: number): Promise<{ success: boolean }> {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: ['organization'],
    });
    if (!task) throw new NotFoundException(`Task ${taskId} not found`);

    const isStatusChanged = task.status !== newStatus;

    let targetTasks = await this.taskRepo.find({
      where: {
        status: newStatus,
        organization: { id: task.organization.id },
      },
      order: { order: 'ASC' },
      relations: ['organization'],
    });

    if (isStatusChanged) {
      targetTasks = targetTasks.filter((t) => t.id !== task.id);
    }

    targetTasks.splice(newIndex, 0, task);

    for (let i = 0; i < targetTasks.length; i++) {
      targetTasks[i].order = i;
      if (targetTasks[i].id === task.id) {
        targetTasks[i].status = newStatus;
      }
    }
    await this.taskRepo.save(targetTasks);

    return { success: true };
  }

  async deleteTask(taskId: number): Promise<{ success: boolean }> {
    const task = await this.taskRepo.findOneBy({ id: taskId });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    await this.taskRepo.delete(taskId);

    return { success: true };
  }

  async editTask(id: number, updates: EditTaskDto): Promise<{ success: boolean }> {
    const task = await this.taskRepo.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    delete (updates as any).createdAt;
    delete (updates as any).updatedAt;

    task.title = updates.title;
    task.description = updates.description;

    this.taskRepo.save(task)

    return { success: true };
  }

}
