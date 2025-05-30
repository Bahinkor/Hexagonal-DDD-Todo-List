import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

@Injectable()
export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(title: string, description: string, userId: string): Promise<Todo> {
    const now = new Date();
    const newTodo = new Todo(randomUUID(), title, description, TodoStatus.PENDING, userId, now);

    return await this.todoRepository.create({
      title,
      description,
      status: TodoStatus.PENDING,
      userId,
    });
  }
}
