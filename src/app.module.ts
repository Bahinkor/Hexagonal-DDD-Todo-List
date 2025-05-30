import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [UserModule, AuthModule, TodoModule],
  providers: [PrismaService],
})
export class AppModule {}
