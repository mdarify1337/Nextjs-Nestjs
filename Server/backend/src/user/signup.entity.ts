import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    OneToMany,
    ManyToMany,
    JoinTable,
    BeforeInsert,
    PrimaryColumn,
  } from 'typeorm';

@Entity('SignUp')
export class CreateSignUpUser {
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    username: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+/, { 
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
    })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Confirm password is required' })
    confirmPassword: string;

    // @Column({ default: '' })
    // firstName?: string;
}