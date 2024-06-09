import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocketService } from './socket/socket.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [SocketService],
})
export class AppModule {}
