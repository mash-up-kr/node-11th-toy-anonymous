import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async addUser(
    @Param('id') id: string,
    @Body() { email, nickName }: { nickName: string; email: string },
  ) {
    return {
      id,
      nickName,
      email,
    };
  }
}
