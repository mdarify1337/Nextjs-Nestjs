import 
    { 
        IsEmail, 
        IsNotEmpty, 
        IsNumber, 
        IsString, 
        MinLength, 
        IsArray, 
        Matches
    } from 'class-validator';
import { BeforeInsert, FindOperator, Unique } from 'typeorm';

// import * as bcrypt from 'bcrypt';
@Unique(['username'])
export class userSignUpDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    username: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+/, { 
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
    })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Confirm password is required' })
    confirmPassword: string;

    // @IsString()
    // @IsNotEmpty({ message: 'First name is required' })
    // firstName?: string;

    // @BeforeInsert()
    // async CrybtPassword(){
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}
