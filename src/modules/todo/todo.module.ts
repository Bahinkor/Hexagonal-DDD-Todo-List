import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { CreateTodoUseCase } from './application/usecases/create-todo.usecase';
import { PrismaTodoRepository } from './infrastructure/prisma/todo.repository.prisma';
import { PrismaModule } from '../../prisma/prisma.module';
import { TodoRepository } from './domain/repositories/todo.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    {
      provide: TodoRepository,
      useClass: PrismaTodoRepository,
    },
  ],
  exports: [TodoRepository],
})
export class TodoModule {}
