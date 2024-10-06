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
import { SignUpController } from './signup.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    HttpModule,
    TypeOrmModule.forFeature([User]),
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
  providers: [UserService],
  controllers: [SignUpController],
  exports: [UserService],
})
export class SignUpModule {}