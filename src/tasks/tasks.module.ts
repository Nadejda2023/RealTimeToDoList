import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketService } from 'src/socket/socket.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [PrismaModule],
  providers: [TasksService, TasksRepository, SocketService],
  controllers: [TasksController],
})
export class TasksModule {}
