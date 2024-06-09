import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task, TaskStatus } from '@prisma/client';
import { UpdateTaskDTO } from './dto/update.task.dto';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDTO) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
        createdAt: dto.createdAt,
        status: dto.status,
        mediaUrl: dto.mediaUrl,
      },
    });
    return task;
  }

  async findTaskById(Id: string): Promise<Task | null> {
    const foundTask = await this.prisma.task.findUnique({
      where: {
        id: parseInt(Id),
      },
    });
    return foundTask;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAllTasks(status?: TaskStatus) {
    const allTasks = await this.prisma.task.findMany({
      // where: {
      //  status: status || 'inProcess',
      //},
      orderBy: { status: 'asc' },
    });
    return allTasks;
  }

  async updateAndSaveTask(id: number, updateDTO: UpdateTaskDTO) {
    try {
      const updatedTask = await this.prisma.task.update({
        where: {
          id: id,
        },
        data: {
          title: updateDTO.title,
          description: updateDTO.description,
          status: updateDTO.status,
        },
      });
      return updatedTask;
    } catch (error) {
      return null;
    }
  }

  async deleteTaskById(Id: string): Promise<Task | null> {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: {
          id: parseInt(Id),
        },
      });
      return deletedTask;
    } catch (error) {
      return null;
    }
  }
}
