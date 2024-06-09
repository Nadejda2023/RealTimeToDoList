import { TaskStatus } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  status: TaskStatus;
}
