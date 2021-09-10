import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthorizedRequest, SignUpDto } from './auth.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthorizedRequest) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthorizedRequest) {
    const {
      email,
      nickName,
      createdAt,
      updatedAt,
    } = await this.userService.findOneById(req.user.id);
    return { email, nickName, createdAt, updatedAt };
  }
}
