import { Type } from "class-transformer";
import 
    { 
        IsArray, 
        IsUUID, 
        IsNotEmpty, 
        IsString, 
        ValidateNested,
        IsOptional
    } from "class-validator";
import { User } from "src/user/user.entity";
import 
    { 
        Entity, 
        PrimaryGeneratedColumn, 
        CreateDateColumn, 
        UpdateDateColumn, 
        Column, 
        ManyToOne, 
        ManyToMany, 
        JoinTable 
    } from "typeorm";


class Keypoints {
    @IsArray()
    projectProgress: string[];
  
    @IsArray()
    challengesFaced: string[];
  
    @IsArray()
    ActionsItems: string[];
  
    @IsArray()
    nextSteps: string[];
  }
  
class AttendeeDto {
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    jobTitle: string;
}

@Entity('meeting')
export class Meeting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamp', nullable: false })
    scheduledAt: Date;

    @ManyToOne(() => User, (user) => user.createdMeetings)
    createdBy: User;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttendeeDto)
    attendees: AttendeeDto[];

    @Column({ nullable: true })
    createdByJobTitle?: string;

    @Column(
        { 
            type: 'enum', 
            enum: ['project', 'casual', 'official'], 
            default: 'project' 
        })
    type: 'project' | 'casual' | 'official';

    @Column({ nullable: true })
    folderName: string;

    @Column({ type: 'jsonb', nullable: true })
    summary?: {
        overview: string;
        keypoints: {
            projectProgress: string[];
            challengesFaced: string[];
            ActionItems: string[];
            nextSteps: string[];
        };
    };



    @Column({ nullable: true })
    transcript?: string;
 
    @Column({ nullable: true })
    notes?: string;

    @Column({ nullable: true, type: 'jsonb', array: false })
    snippets?: string[];

    @Column({ nullable: true })
    meetingVideoUrl?: string;
}

