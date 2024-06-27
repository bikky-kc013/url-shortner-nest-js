import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }
  async validate(payload: any) {
    try {
      if (!payload) {
        throw new HttpException(
          'Invalid or expired token headers',
          HttpStatus.FORBIDDEN,
        );
      }
      if (payload.role === 'user') {
        return {
          id: payload.id,
          role: payload.role,
        };
      }
      return {
        id: payload.id,
        role: payload.role,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
