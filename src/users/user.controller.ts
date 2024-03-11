import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user-create.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}
  
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
}
