//import { TaskStatus } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  userId: number;

  @IsOptional()
  createdAt: Date;

  @IsNotEmpty()
  status: TaskStatusT;

  @IsOptional()
  mediaUrl: string;
}

export enum TaskStatusT {
  inProcess = 'inProcess',
  done = 'done',
}
