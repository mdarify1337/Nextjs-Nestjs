// src/Strategy/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('GOOGLE_SECRET'), // Use the JWT_SECRET from the environment
    });
  }

  async validate(payload: any) {
    // Customize the validation logic as needed
    return { userId: payload.sub, username: payload.username };
  }
}
