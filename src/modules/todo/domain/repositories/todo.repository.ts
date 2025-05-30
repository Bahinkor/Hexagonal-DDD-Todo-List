import { Todo } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract create(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo>;
  abstract findAllByUserId(userId: string): Promise<Todo[]>;
}
