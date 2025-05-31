import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserRepository } from './domain/repositories/user.repository';
import { User } from './domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const { username, firstName, lastName, password } = body;

    const user = await this.createUserUseCase.execute(username, firstName, lastName, password);

    return user;
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: string): Promise<User | null> {
    return await this.userRepository.findOneById(id);
  }
}
