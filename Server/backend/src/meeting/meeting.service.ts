// src/meetings/meetings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './meeting.entity';
import { User } from '../user/user.entity'; // Import User entity
import {AttendeeDto} from '../Dto/attendedto';

@Injectable()
export class MeetingsService {
    constructor(
        @InjectRepository(Meeting)
        private meetingsRepository: Repository<Meeting>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createMeeting(meeting: Meeting, userId: string): Promise<Meeting> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        
        if (!user) {
            throw new Error('User not found');
        }
        meeting.createdBy = user;
        meeting.createdByJobTitle = user.id;
        if (meeting.summary 
            && meeting.summary.keypoints 
            && meeting.summary.keypoints.ActionItems) {
            const actionItemUserIds = meeting.summary.keypoints.ActionItems.map(item => item.memberId);
            const actionItemUsers = await this.usersRepository.findByIds(actionItemUserIds);
            meeting.connections = user.connections;
        }
        if (meeting.summary) {
            meeting.summary = {
                ...meeting.summary,
                overview: meeting.summary.overview,
                keypoints: {
                    projectProgress: meeting.summary.keypoints.projectProgress || [],
                    challengesFaced: meeting.summary.keypoints.challengesFaced || [],
                    ActionItems: meeting.summary.keypoints.ActionItems || [],
                    nextSteps: meeting.summary.keypoints.nextSteps || []
                }
            };
        }
    
        console.log('Meeting created by user -> ', meeting);
        return this.meetingsRepository.save(meeting);
    }
    
    

    async getAllMeetings(): Promise<Meeting[]> {
        return this.meetingsRepository.find(
            { 
                relations: ['createdBy'] 
            });
    }

    async getMeetingById(id: string): Promise<Meeting> {
        return this.meetingsRepository.findOne(
            { 
                where: { id }, 
                relations: ['createdBy'] 
            });
    }

    async deleteMeeting(id: string): Promise<void> {
        await this.meetingsRepository.delete(id);
    }
}
