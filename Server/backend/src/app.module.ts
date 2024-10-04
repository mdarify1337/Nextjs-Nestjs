import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './Strategy/google.strategy';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import googleOauthConfig from './Configuration/google.config'
import { CreateSignUpUser } from './userform/signup.entity';
import { SignUpModule } from './userform/signup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleOauthConfig],  // Load configuration
      isGlobal: true,  // Make ConfigModule global if needed
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, CreateSignUpUser],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    SignUpModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule { }

