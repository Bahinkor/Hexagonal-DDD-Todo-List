import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<User> {
    const now = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(randomUUID(), username, firstName, lastName, hashedPassword, now);

    return await this.userRepository.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
  }
}
