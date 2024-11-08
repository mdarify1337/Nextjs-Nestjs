import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from '@nestjs/passport'
import { GoogleAuthGuard } from './guards/google.guards';
import { GithubAuthGuard } from './guards/github.guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get()
  @UseGuards(GoogleAuthGuard)
  async googlelogin(@Req() req) { }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/google/callback')
  async googleLoginCallback(
      @Req() req, 
      @Res() res): 
    Promise<void> 
  {
    console.log(req.user)
    const firstLogin = req.user?.firstLogin;
    const accessToken = req.user?.appAccessToken;
    const providerAccessToken = req.user?.providerAccessToken;
    const refreshToken = req.user?.refreshToken;
    res.cookie('firstLogin', firstLogin)
    res.cookie('access_token', accessToken)
    res.cookie('providerAccessToken', providerAccessToken)
    res.cookie('refreshToken', refreshToken)
    // console.log('response -> ', res);
    res.redirect(`http://localhost:3000/`)
  }

 
}



// ?firstLogin=${firstLogin}&accessToken=${accessToken}&provider=${providerAccessToken}f