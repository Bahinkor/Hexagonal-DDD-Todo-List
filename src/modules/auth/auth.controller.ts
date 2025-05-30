import { Body, Controller, Post } from '@nestjs/common';

import { LoginUseCase } from './application/use-cases/login.usecase';
import { LoginDto } from './domain/dto/login.dto';
import { RegisterDto } from './domain/dto/register.dto';
import { RegisterUseCase } from './application/use-cases/register.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = body;
    return await this.loginUseCase.execute(username, password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ access_token: string }> {
    return await this.registerUseCase.execute(registerDto);
  }
}
