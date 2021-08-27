import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUser() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.findAndUpdate(id, dto);
  }

  @Post()
  async addUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
