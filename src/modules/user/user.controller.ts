import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return { id };
  }
}
