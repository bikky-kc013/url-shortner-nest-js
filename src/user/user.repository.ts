import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  //Get user by id
  getById = async (id: string): Promise<User> => {
    try {
      const data = await this.userRepository.findOne({ where: { id: id } });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //Get user by email
  getByEmail = async (email: string) => {
    try {
      const data = await this.userRepository.findOne({
        where: { email: email },
        select: [
          'password',
          'createdAt',
          'email',
          'fullName',
          'id',
          'updatedAt',
        ],
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //create user
  createUser = async (data: User) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await this.userRepository.create({
        id: v4(),
        fullName: data.fullName,
        password: hash,
        email: data.email,
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };
}
