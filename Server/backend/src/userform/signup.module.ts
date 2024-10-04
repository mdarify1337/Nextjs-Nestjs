import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HttpModule } from '@nestjs/axios';
import { UserController } from '../user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from '../Strategy/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import googleOauthConfig from '../Configuration/google.config';
import { CreateSignUpUser } from './signup.entity';
import { SignUpService } from './signup.service';
import { SignUpController } from './signup.controller';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([CreateSignUpUser]),
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [SignUpService],
  controllers: [SignUpController],
  exports: [SignUpService],
})
export class SignUpModule {}