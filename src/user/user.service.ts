import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserInfo = async (id: string) => {
    try {
      const data = await this.userRepository.getById(id);
      if (!data) {
        throw new HttpException(
          {
            status: 404,
            error: 'Unable to find user with the provided Id',
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const data = await this.userRepository.getByEmail(email);
      return data;
    } catch (error) {
      throw error;
    }
  };

  createUser = async (user) => {
    try {
      const data = await this.userRepository.createUser(user);
      return data;
    } catch (error) {
      throw error;
    }
  };
}
