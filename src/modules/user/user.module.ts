import { Module } from '@nestjs/common';

import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.usecase';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/prisma/user.repository.prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
