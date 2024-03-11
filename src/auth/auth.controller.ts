import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Public } from './decorators/is-public.decorator';
import { User } from 'src/users/schemas/user.schema';
import { GetUserRequest } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Get()
  checkAuthStatus(@GetUserRequest() user: User) {
    return this.authService.checkAuthStatus(user._id);
  }
}
