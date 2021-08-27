import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  nickName: string;

  @IsEmail()
  email: string;
}
