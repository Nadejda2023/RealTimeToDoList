import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { User } from '@prisma/client';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(protected userRepository: UserRepository) {}

  async createUsers(dto: CreateUserDTO): Promise<User> {
    const newUser = {
      email: dto.email,
      name: dto.name,
    };

    const result: User = await this.userRepository.createUser({ ...newUser });
    return {
      id: result.id,
      email: result.email,
      name: result.name,
    };
  }

  async getAllUsers() {
    const result = await await this.userRepository.getAllUsers();
    if (!result) throw new BadRequestException();
    return result;
  }
}
