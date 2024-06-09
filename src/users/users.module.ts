import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketService } from 'src/socket/socket.service';
import { UserRepository } from './users.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, SocketService, UserRepository],
})
export class UsersModule {}
