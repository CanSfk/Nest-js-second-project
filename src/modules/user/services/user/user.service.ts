import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UserEntity } from 'src/typeorm';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: UserRepository,
  ) {}

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.create(createUserDto);
  }

  async updateUser(
    id: number,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userRepository.update(id, createUserDto);
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findById(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  async findUserValidate(userName: string): Promise<UserEntity | null> {
    return await this.userRepository.findUserValidate(userName);
  }
}
