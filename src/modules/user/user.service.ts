import { User } from '../../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findAndUpdate(id: string, { email, nickName }: UserDto): Promise<User> {
    const user = await this.findOne(id);
    user.email = email;
    user.nickName = nickName;
    return await this.usersRepository.save(user);
  }

  async createUser({ email, nickName }: UserDto): Promise<User> {
    const user = this.usersRepository.create({ email, nickName });
    return await this.usersRepository.save(user);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.usersRepository.delete(id);
    return;
  }
}
