import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './authentication.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { refreshAuthGuard } from './guards/refresh-auth.guard';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guards/roles-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/register')
  async registerUser(@Body() data: UserCredentialsDto) {
    const datas = await this.authService.create(data);
    const { password, ...result } = datas;
    password;
    return {
      status: 'Success',
      data: result,
      message: 'Successfully registred a new user',
    };
  }

  @UseGuards(AuthGuard('user-local'))
  @Post('user/login')
  async loginUser(@Request() req) {
    const response = await this.authService.loginUser(req.user);
    return {
      status: 'success',
      data: response,
      message: 'Sucessfully logged in',
    };
  }

  @UseGuards(refreshAuthGuard)
  @Post('user/refresh')
  async refreshTokenUser(@Request() req) {
    const token = await this.authService.refreshUser(req.user);
    return {
      status: 'Success',
      accessToken: token,
      message: 'Access token',
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('data')
  async data() {
    return {
      status: 'Success',
      data: [
        {
          name: 'Bikky',
        },
      ],
      message: 'Successfully fetched the data',
    };
  }
}
