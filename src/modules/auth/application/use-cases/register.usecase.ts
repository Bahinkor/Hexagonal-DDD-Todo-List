import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { RegisterDto } from '../../domain/dto/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const { username, firstName, lastName, password } = registerDto;
    const now = new Date();

    const newUser = await this.userRepository.create({
      username,
      firstName,
      lastName,
      password,
    });

    const payload = { sub: newUser.id, username: newUser.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
