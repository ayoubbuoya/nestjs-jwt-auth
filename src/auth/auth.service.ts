import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, password: string) {
    const user = { username, password };
    return await this.usersService.create(user);
  }

  async getAllUsers() {
    return await this.usersService.findAll();
  }
}
