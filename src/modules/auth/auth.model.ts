import { User } from 'src/entities/user.entity';
import { Request } from 'express';
import { IsString, IsEmail } from 'class-validator';

export type AuthorizedRequest = Request & { user: User };

export class SignUpDto {
  @IsString()
  nickName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
