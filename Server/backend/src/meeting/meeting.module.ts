// src/meetings/meetings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meeting.service';
import { MeetingsController } from './meeting.controller';
import { Meeting } from './meeting.entity';
import { User } from '../user/user.entity'; // Import User entity

@Module({
    imports: [TypeOrmModule.forFeature([Meeting, User])],
    providers: [MeetingsService],
    controllers: [MeetingsController],
})
export class MeetingsModule {}
