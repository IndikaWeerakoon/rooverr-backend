import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  public async createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
