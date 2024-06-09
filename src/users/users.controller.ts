import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async createUsers(@Body() dto: CreateUserDTO): Promise<User | null> {
    return this.userService.createUsers(dto);
  }

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
