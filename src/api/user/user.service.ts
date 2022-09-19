import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 유저 생성
   * @returns UserDto 생성된 User의 userId를 반환합니다.
   */
  async join() {
    // 새로운 유저 생성
    const newUser = await this.userRepository.create().save();
    return new UserDto(newUser);
  }
}
