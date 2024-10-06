import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class userSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}