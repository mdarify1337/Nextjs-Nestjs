import { VerifyCallback } from 'passport-google-oauth20';
import { UserService } from './user/user.service';
import { ConfigType } from '@nestjs/config';
import googleOauthConfig from './Configuration/google.config';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private googleConfiguration;
    private readonly userService;
    constructor(googleConfiguration: ConfigType<typeof googleOauthConfig>, userService: UserService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
    serializeUser(user: any, done: Function): void;
    deserializeUser(id: string, done: Function): void;
}
export {};
