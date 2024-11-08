import { 
    Controller, 
    Get, 
    Req, 
    Res, 
    UseGuards 
  } from '@nestjs/common';
import { GithubAuthGuard } from 'src/guards/github.guards';

@Controller('github')
export class GithubController {

    @Get('login')
    @UseGuards(GithubAuthGuard)
    async githublogin(@Req() req) {
        console.log('fdsfdsfsd')
     }

    @Get('auth/callback')
    @UseGuards(GithubAuthGuard)
    async githublogincallback(
      @Req() req, 
      @Res() res): 
      Promise<void> {
      console.log('ljsdfl', req.user)
      console.log('github req user -> ', req.user);
      const firstLogin = req.user.firstLogin;
      const accessToken = req.user.appAccessToken;
      const providerAccessToken = req.user.providerAccessToken;
      const refreshToken = req.user.refreshToken;
      res.cookie('firstLogin', firstLogin)
      res.cookie('access_token', accessToken)
      res.cookie('providerAccessToken', providerAccessToken)
      res.cookie('refreshToken', refreshToken)
      res.redirect(`http://localhost:3000/`)
    }
}
