import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUser() {
    const users = await this.userService.findAll();
    return users.map(({ password, ...user }) => {
      void password;
      return user;
    });
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);
    delete user.password;
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserDto,
  ) {
    const user = await this.userService.findAndUpdate(id, dto);
    delete user.password;
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
