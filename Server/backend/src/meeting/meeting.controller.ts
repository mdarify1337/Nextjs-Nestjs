// src/meetings/meetings.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MeetingsService } from './meeting.service';
import { Meeting } from './meeting.entity';

@Controller('meetings')
export class MeetingsController {
    constructor(private meetingsService: MeetingsService) {}

    @Post()
    async createMeeting(
        @Body() meetingData: Meeting, 
        @Body('userId') userId: string)
        : Promise<Meeting> {
        return this.meetingsService.createMeeting(
                meetingData, 
                userId);
    }

    @Get()
    async getAllMeetings(): Promise<Meeting[]> {
        return this.meetingsService.getAllMeetings();
    }

    @Get(':id')
    async getMeetingById(
        @Param('id') id: string)
        : Promise<Meeting> {
        return this.meetingsService.getMeetingById(id);
    }

    @Delete(':id')
    async deleteMeeting(
        @Param('id') id: string): 
        Promise<void> {
        return this.meetingsService.deleteMeeting(id);
    }
}
