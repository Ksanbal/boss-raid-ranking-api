import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaidRecordEntity } from '../boss-raid/entities/raid-record.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RaidRecordEntity)
    private readonly raidRecordRepository: Repository<RaidRecordEntity>,
  ) {}

  /**
   * 유저 생성
   * @returns CreateUserDto 생성된 User의 userId를 반환합니다.
   */
  async join() {
    // 새로운 유저 생성
    const newUser = await this.userRepository.create().save();
    return new CreateUserDto(newUser);
  }

  /**
   * 유저 조회
   * @param userId 유저 id
   */
  async retrieve(userId: number) {
    // 존재하는 userId인지 체크
    const userCount = await this.userRepository.count({ where: { userId } });
    if (userCount < 1) {
      throw new NotFoundException();
    }

    // userId로 레이드 기록 조회
    const userRaidRecords = await this.raidRecordRepository.find({
      where: {
        user: { userId },
      },
    });

    // total Score 구하기
    let totalScore = 0;
    userRaidRecords.forEach((record) => {
      totalScore += record.score ?? 0; // score가 Null인 경우 0으로 계산
    });

    return new UserDto(totalScore, userRaidRecords);
  }
}
