import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

@Injectable()
export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    description: string;
    status: TodoStatus;
    userId: string;
  }): Promise<Todo> {
    const todo = await this.prisma.todo.create({ data });

    return new Todo(
      todo.id,
      todo.title,
      todo.description,
      todo.status,
      todo.userId,
      todo.createdAt,
      todo.updatedAt,
    );
  }

  async findAllByUserId(userId: string): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany({ where: { userId } });

    return todos.map(
      (todo) =>
        new Todo(
          todo.id,
          todo.title,
          todo.description,
          todo.status,
          todo.userId,
          todo.createdAt,
          todo.updatedAt,
        ),
    );
  }
}
