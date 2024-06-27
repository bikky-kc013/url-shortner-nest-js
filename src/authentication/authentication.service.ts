import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async create(data: UserCredentialsDto): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new HttpException(
        'User with this email is already registered',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.userService.createUser(data);
    if (!newUser) {
      this.logger.error('Unable to create a new user');
      throw new HttpException(
        'Unable to create a new user',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return newUser;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      password;
      return result;
    }
    this.logger.warn(`Invalid credentials for email: ${email}`);
    throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
  }

  async loginUser(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { id: user.id, role: 'user' };
    const accessToken = await this.jwt.signAsync(payload);
    const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' });

    this.logger.log(`User logged in: ${user.email}`);
    return { accessToken, refreshToken };
  }

  async refreshUser(user: User): Promise<{ accessToken: string }> {
    const payload = { id: user.id, email: user.email, role: 'user' };
    const accessToken = await this.jwt.signAsync(payload);

    this.logger.log(`Token refreshed for user: ${user.email}`);
    return { accessToken };
  }
}
