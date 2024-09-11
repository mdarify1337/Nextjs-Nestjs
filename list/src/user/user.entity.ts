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
    id: string;
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    picture: string;
  

    @Column({nullable: false})
    provider: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    username: string;
    
    @Column({ nullable: true })
    googleToken: string;

    @BeforeInsert()
    generateUUID() {
      this.id = uuidv4();
    }
    
  }