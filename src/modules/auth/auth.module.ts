import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { TodoModule } from '../todo/todo.module';
import { GetMeUseCase } from './application/use-cases/get-me.usecase';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    TodoModule,
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, RegisterUseCase, GetMeUseCase, JwtStrategy],
})
export class AuthModule {}
