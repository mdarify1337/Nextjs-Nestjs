import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import githubConfig from 'src/Configuration/github.config';
import { GithubService } from 'src/user/github/github.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @Inject(githubConfig.KEY)
    private githubConfiguration: ConfigType<typeof githubConfig>,
    private readonly userService: UserService,  
  ) {
    super({
      clientID: githubConfiguration.clinetID, // Fixed typo from clinetID to clientID
      clientSecret: githubConfiguration.clientSecret,
      callbackURL: githubConfiguration.callbackURL,
      scope: ['user:email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function) {
    console.log('github profile -> ', profile);
    try {
      const email = profile.emails[0].value;
      const picture = profile.photos[0].value;
      const id = profile.id;
      const lastName = profile.profileUrl;
      const username = profile.username;
      const provider = profile.provider;
      const firstName = profile.displayName;
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
    } catch (error) {
        done(null, error);
    }
    console.log('github user -> ', user);
    done(null, user);
  }
}
