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

    async createMeeting(meeting: Meeting, userId: string): 
        Promise<Meeting> 
    {
        const user = await this.usersRepository.findOneBy(
            { id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        meeting.createdBy = user;
        meeting.createdByJobTitle = user.jobTitle;
        if (!meeting.attendees) {
            meeting.attendees = [];
        }
        const isCreatorInAttendees = meeting.attendees.some(
                        attendee => attendee.id === user.id);
        if (!isCreatorInAttendees){
            const attendeeDto: AttendeeDto = {
                id: user.id,
                username: user.username,
                jobTitle: user.jobTitle,
            }
            meeting.attendees.push(attendeeDto);
        }
        console.log('Meeting created by user -> ', meeting);
        return this.meetingsRepository.save(meeting);
    }
    
    
    // async createMeeting(meeting: Meeting, userId: string): Promise<Meeting> {
    //     const user = await this.usersRepository.findOneBy({ id: userId });
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     meeting.createdBy = user;
    //     meeting.createdByJobTitle = user.jobTitle;
    //     if (!meeting.attendees) {
    //         meeting.attendees = [];
    //     }
    //     const isCreatorInAttendees = meeting.attendees.some(
    //             attendee => attendee.id === user.id);
    //     // const attendees = await this.usersRepository.findByIds(attendeeIds);
    //     if (!isCreatorInAttendees) {
    //         const attendeeDto: AttendeeDto = {
    //             id: user.id,
    //             username: user.username,
    //             jobTitle: user.jobTitle,
    //         };
    //         meeting.attendees.push(attendeeDto);
    //     }
    //     console.log('user create meeting -> ', meeting);
    //     return this.meetingsRepository.save(meeting);
    // }

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
