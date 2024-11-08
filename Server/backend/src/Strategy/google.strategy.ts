import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import googleOauthConfig from '../Configuration/google.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private readonly userService: UserService,    
        
    ) {
        super({
            clientID: googleConfiguration.clinetID, 
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ['email', 'profile'],
        });
    }
    async validate(
            accessToken: string, 
            
            refreshToken: string,
            profile: any,
            done: VerifyCallback): 
            Promise<any> {
        try {
            const email = profile.emails[0].value;
            const picture = profile._json.picture;
            const firstName = profile.name.familyName;
            const lastName = profile.name.givenName;
            const username = profile.displayName;
            const id = profile.id;
            const provider = profile.provider;
            var user = await this.userService.findOrcreateUser(
                { 
                    email, 
                    firstName, 
                    lastName, 
                    picture, 
                    username, 
                    id, 
                    provider
                })
            console.log('UserValidate : ',user)
            const shortLivedAccessToken = await 
                this.userService.generateAccessToken(user);
            return {
                user: user,
                firstLogin: user.firstLogin,
                appAccessToken: shortLivedAccessToken.accessToken,
                providerAccessToken: accessToken,
                refreshToken: shortLivedAccessToken.refreshToken
            }
        }
        catch (error) {
            done(null, error)
        }
        
    }
    serializeUser(user: any, done: Function) {
        done(null, user.id);
      }
    
    deserializeUser(id: string, done: Function) {
        this.userService.viewUser(id)
          .then((user: any) => done(null, user))
          .catch((error: any) => done(error));
    }
    
}
