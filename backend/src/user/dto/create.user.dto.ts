import 
    { 
        IsEmail, 
        IsNotEmpty, 
        IsNumber, 
        IsString, 
        MinLength, 
        IsArray 
    } from 'class-validator';
import { FindOperator } from 'typeorm';

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    lastName: string;


    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    provider: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    picture: string;


	static email: string | FindOperator<string>;
	static username: string | FindOperator<string>;

}