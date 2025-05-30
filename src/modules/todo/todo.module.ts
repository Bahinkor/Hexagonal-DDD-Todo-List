import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { CreateTodoUseCase } from './application/usecases/create-todo.usecase';
import { PrismaTodoRepository } from './infrastructure/prisma/todo.repository.prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { TodoRepository } from './domain/repositories/todo.repository';

@Module({
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    PrismaService,
    {
      provide: TodoRepository,
      useClass: PrismaTodoRepository,
    },
  ],
})
export class TodoModule {}
