import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { RegisterDto } from '../../domain/dto/register.dto';
import { ENV } from '../../../../common/config/env.config';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const { username, firstName, lastName, password } = registerDto;
    const now = new Date();
    const hashesPassword = await bcrypt.hash(password, ENV.HASH_SALT);

    const isUsernameExist = await this.userRepository.findOneByUsername(username);

    if (isUsernameExist) {
      throw new BadRequestException('username is already exist');
    }

    const newUser = await this.userRepository.create({
      username,
      firstName,
      lastName,
      password: hashesPassword,
    });

    const payload = { sub: newUser.id, username: newUser.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
