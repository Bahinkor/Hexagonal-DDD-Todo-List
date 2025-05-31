import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { LoginUseCase } from './application/use-cases/login.usecase';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { JwtAuthGuard } from './infra/guards/jwt-auth.guard';
import { RequestWithUser } from '../../common/types/express-request-with-user.type';
import { GetMeUseCase } from './application/use-cases/get-me.usecase';
import { UserWithTodosDto } from './dto/user-with-todos.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getMeUseCase: GetMeUseCase,
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: RequestWithUser): Promise<UserWithTodosDto | null> {
    const userId = req.user.userId;
    return await this.getMeUseCase.execute(userId);
  }
}
