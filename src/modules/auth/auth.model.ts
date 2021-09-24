import { Request } from 'express';
import { IsString, IsEmail } from 'class-validator';
import { User } from '../../entities/user.entity';

export type AuthorizedRequest = Request & { user: User };

export class SignUpDto {
  @IsString()
  nickName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
