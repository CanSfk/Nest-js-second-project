import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UserEntity } from 'src/typeorm';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createUserDto);
  }

  updateUser(id: number, createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.update(id, createUserDto);
  }

  getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }

  deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
