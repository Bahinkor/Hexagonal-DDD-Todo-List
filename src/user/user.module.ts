import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { prismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [prismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
