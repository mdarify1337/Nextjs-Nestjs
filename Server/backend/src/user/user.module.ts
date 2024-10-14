import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from '../Strategy/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import googleOauthConfig from '../Configuration/google.config';
import { GithubStrategy } from 'src/Strategy/github.strategy';
import { SignUpModule } from 'src/userform/signup.module';
import { GithubModule } from './github/github.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('GOOGLE_SECRET'), 
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [UserService, GoogleStrategy, GithubStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
