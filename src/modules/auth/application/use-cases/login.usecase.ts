import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../../../user/domain/repositories/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
