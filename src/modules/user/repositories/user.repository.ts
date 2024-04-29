import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudRepository } from 'src/common/repositories/BaseCrudRepository';
import { UserEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseCrudRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository, 'Kullanıcı');
  }
}
