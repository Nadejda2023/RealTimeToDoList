import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task, TaskStatus } from '@prisma/client';
import { UpdateTaskDTO } from './dto/update.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @HttpCode(201)
  async createUsers(@Body() dto: CreateTaskDTO): Promise<Task | null> {
    return this.taskService.createTask(dto);
  }

  @Get()
  @HttpCode(200)
  async getAllTasks(@Query('status') status?: TaskStatus): Promise<Task[]> {
    return this.taskService.getAllTasks(status);
  }

  @Put(':Id')
  @HttpCode(204)
  async updateTask(@Param('Id') Id: string, @Body() updateDTO: UpdateTaskDTO) {
    return this.taskService.updateTask(Id, updateDTO);
  }

  @Delete(':Id')
  @HttpCode(204)
  async deleteTask(@Param('Id') Id: string) {
    return this.taskService.deleteTask(Id);
  }
}
