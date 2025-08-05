import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from '@turbovets-challenge/data/dtos/create-task.dto';
import { GetUserJwt, Roles } from '@turbovets-challenge/auth/decorators';
import { JwtAuthGuard } from '@turbovets-challenge/auth/guards';
import { RolesGuard } from '@turbovets-challenge/auth/guards';
import { RoleEnum, TaskStatus } from '@turbovets-challenge/data/enums';
import { EditTaskDto, UpdateTaskOrderDto } from '@turbovets-challenge/data/dtos';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  async create(
    @Body() dto: CreateTaskDto,
    @GetUserJwt('userId') userId: number,
    @GetUserJwt('organizationId') orgId: number,
  ) {
    return this.taskService.createTask(dto, userId, orgId);
  }

  @Get()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.VIEWER)
  async getLinkedTasks(
    @Req() req: any,
    @GetUserJwt('userId') userId: number,
    @GetUserJwt('organizationId') orgId: number,
  ) {
    return this.taskService.getAllTasksByStatus(userId, orgId);
  }

  @Patch(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  async moveTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskOrderDto,
  ): Promise<{ success: boolean }> {
    return this.taskService.updateTask(id, body.newStatus, body.newIndex);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  async editTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EditTaskDto
  ): Promise<{ success: boolean }> {
    return this.taskService.editTask(id, body);
  }

  @Delete(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  async deleteTask(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ success: boolean }> {
    return this.taskService.deleteTask(id);
  }
}
