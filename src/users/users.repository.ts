import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
      },
    });
    return user;
  }

  async getAllUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }
}
