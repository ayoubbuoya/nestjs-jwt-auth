import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LoginUserDto, RegisterUserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() userDto: LoginUserDto) {
    return this.authService.signIn(userDto.email, userDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() userDto: RegisterUserDto) {
    const user = userDto;
    user.password = await this.authService.hashPassword(user.password);
    return this.authService.register(user);
  }

  @Public()
  @Get('users')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('test-public')
  testPublic() {
    return 'This is a public route';
  }
}
