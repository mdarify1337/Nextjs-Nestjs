import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './Strategy/google.strategy';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './Configuration/google.config';
import githubOauthConfig from './Configuration/github.config'; // Renamed for consistency
import { SignUpModule } from './userform/signup.module';
import { GithubModule } from './user/github/github.module';
import { GithubStrategy } from './Strategy/github.strategy';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { Meeting } from './meeting/meeting.entity';
import { MeetingsModule } from './meeting/meeting.module';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleOauthConfig, githubOauthConfig],  // Use consistent naming
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Meeting],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    SignUpModule,
    GithubModule,
    ChatModule,
    MeetingsModule,
    ProjectModule
  ],
  controllers: [AppController, ChatController],
  providers: [AppService, GoogleStrategy, GithubStrategy,ChatService, ProjectService],
})
export class AppModule {}