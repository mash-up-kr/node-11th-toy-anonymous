import { User } from '../../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/create-user.dto';
import { SignUpDto } from '../auth/auth.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
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

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async findAndUpdate(id: number, { email, nickName }: UserDto): Promise<User> {
    const user = await this.findOneById(id);
    user.email = email;
    user.nickName = nickName;
    return await this.usersRepository.save(user);
  }

  async createUser(data: SignUpDto): Promise<User> {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
    return;
  }
}
