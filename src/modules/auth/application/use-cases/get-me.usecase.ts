import { Injectable } from '@nestjs/common';

import { TodoRepository } from '../../../todo/domain/repositories/todo.repository';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { UserWithTodosDto } from '../../dto/user-with-todos.dto';

@Injectable()
export class GetMeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(userId: string): Promise<UserWithTodosDto | null> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return null;
    }

    const todos = await this.todoRepository.findAllByUserId(userId);

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      todos: todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        createdAt: todo.createdAt,
      })),
    };
  }
}
