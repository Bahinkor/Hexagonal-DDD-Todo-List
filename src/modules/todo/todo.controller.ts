import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { CreateTodoUseCase } from './application/usecases/create-todo.usecase';
import { Todo } from './domain/entities/todo.entity';
import { CreateTodoDto } from './domain/dto/create-todo.dto';
import { JwtAuthGuard } from '../auth/infra/guards/jwt-auth.guard';
import { RequestWithUser } from '../../common/types/express-request-with-user.type';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req: RequestWithUser): Promise<Todo> {
    const { title, description } = createTodoDto;
    const userId: string = req.user?.userId;

    return await this.createTodoUseCase.execute(title, description, userId);
  }
}
