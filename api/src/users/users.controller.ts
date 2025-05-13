import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  disableUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.disableUser(+id, updateUserDto);
  }
}
