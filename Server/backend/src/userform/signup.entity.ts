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

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'

@Entity('')
@Unique(['email', 'username'])
export class CreateSignUpUser {

    @PrimaryGeneratedColumn(
        'uuid', 
        { 
            name: 'id', 
            comment: 'User ID' 
        }
    )
    id?: string;

    @Column()
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
    confirmPassword?: string;
    
    @Column({ nullable: true})
    firstName?: string;
  
    @Column({ nullable: true})
    lastName?: string;
  
    @Column({ nullable: true})
    picture?: string;
  

    @Column({nullable: true})
    provider?: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @BeforeInsert()
    generateUUID() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}