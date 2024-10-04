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
    BeforeUpdate,
  } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
@Entity('user')
@Unique(['id', 'email', 'username'])
export class User {
    @PrimaryGeneratedColumn(
            'uuid', 
            { 
                name: 'id', 
                comment: 'User ID' 
            }
        )
    id?: string;
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ nullable: true})
    firstName?: string;
  
    @Column({ nullable: true})
    lastName?: string;
  
    @Column({ nullable: true})
    picture?: string;
  

    @Column({nullable: true})
    provider?: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    password?: string;

    @Column({nullable: true})
    confirmPassword?: string;

    @BeforeInsert()
    async hashPassword() {
        // Ensure password is hashed before insertion
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