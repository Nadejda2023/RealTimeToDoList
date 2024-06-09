import { BadRequestException, Injectable } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task, TaskStatus } from '@prisma/client';
import { TasksRepository } from './tasks.repository';
import { UpdateTaskDTO } from './dto/update.task.dto';

@Injectable()
export class TasksService {
  constructor(
    private socketService: SocketService,
    protected taskRepository: TasksRepository,
  ) {}

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    const newTask = {
      title: dto.title,
      description: dto.description,
      userId: dto.userId,
      createdAt: dto.createdAt,
      status: dto.status,
      mediaUrl: dto.mediaUrl,
    };

    const result = await this.taskRepository.createTask({ ...newTask });

    this.socketService.handleTaskCreate(result);

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      userId: result.userId,
      createdAt: result.createdAt,
      status: result.status,
      mediaUrl: result.mediaUrl,
    };
  }

  async getAllTasks(status?: TaskStatus) {
    const result = await await this.taskRepository.getAllTasks(status);
    if (!result) throw new BadRequestException();
    return result;
  }

  async updateTask(Id: string, updateDTO: UpdateTaskDTO) {
    const foundTask = await this.taskRepository.findTaskById(Id);
    if (foundTask) {
      const updateTask = await this.taskRepository.updateAndSaveTask(
        foundTask.id,
        updateDTO,
      );
      this.socketService.handleTaskUpdates(updateTask);

      return updateTask;
    } else {
      return null;
    }
  }

  async deleteTask(Id: string): Promise<Task | null> {
    const deleteTask = await this.taskRepository.deleteTaskById(Id);

    this.socketService.handleTaskDelete(deleteTask);

    return deleteTask;
  }
}
