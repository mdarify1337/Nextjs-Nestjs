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

export class Project {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    
}