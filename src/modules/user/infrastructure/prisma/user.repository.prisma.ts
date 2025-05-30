import { Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<User> {
    const user = await this.prisma.user.create({ data });

    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(
      (user) =>
        new User(
          user.id,
          user.username,
          user.firstName,
          user.lastName,
          user.password,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
