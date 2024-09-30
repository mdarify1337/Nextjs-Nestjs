import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class userSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}