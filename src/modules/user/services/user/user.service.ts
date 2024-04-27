import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
}
