import { Module } from '@nestjs/common';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalUserStrategy } from './strategies/local-user-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { refreshJwtStrategy } from './strategies/refresh-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalUserStrategy, refreshJwtStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthenticationModule {}
