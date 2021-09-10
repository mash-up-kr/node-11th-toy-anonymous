import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { SignUpDto } from './auth.model';
import { PasswordHasher } from './password-hasher';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user == null) {
      return null;
    }
    if (
      await this.passwordHasher.equal({
        plain: password,
        hashed: user.password,
      })
    ) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userName: user.nickName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup({ email, nickName, password }: SignUpDto) {
    const user = await this.userService.createUser({
      email,
      nickName,
      password: await this.passwordHasher.hash(password),
    });

    return {
      access_token: this.jwtService.sign({
        userName: user.nickName,
        sub: user.id,
      }),
    };
  }
}
