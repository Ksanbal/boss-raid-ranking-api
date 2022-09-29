import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BossRaidDataRepository } from 'src/repositories/boss-raid-data/boss-raid-data.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { EnterBossRaidDto } from './dtos/enterBossRaid.dto';
import { EnterBossRaidResDto } from './dtos/enterBossRaid.res.dto';
import { RaidRecordEntity } from './entities/raid-record.entity';

@Injectable()
export class BossRaidService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RaidRecordEntity)
    private readonly raidRecordRepository: Repository<RaidRecordEntity>,

    private readonly bossRaidDataRepository: BossRaidDataRepository,
  ) {}

  /**
   * 보스레이드 입장
   * @param enterBossRaidDto
   * @returns EnterBossRaidResDto
   */
  async enter(
    enterBossRaidDto: EnterBossRaidDto,
  ): Promise<EnterBossRaidResDto> {
    const { userId, level } = enterBossRaidDto;
    const bossRaidData = await this.bossRaidDataRepository.getBossRaidData(); // Static Data

    // [x] 존재하는 유저인지 체크
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new UnauthorizedException('존재하지 않는 사용자입니다.');

    // [x] 유효한 level인지 체크
    const avaliableLevels = bossRaidData.bossRaids[0].levels.map(
      (level) => level.level,
    );
    if (!(level in avaliableLevels)) {
      throw new BadRequestException('유효하지않은 level입니다.');
    }

    // [x] 보스레이드 입장 가능 상태 조회
    const canEnter = await this.canEnterRaid();

    // [x] 불가능 -> 불가능 에러
    if (!canEnter) return new EnterBossRaidResDto(false, null);

    // [x] 가능 -> 레이드 레코드 생성 (StaticData의 bossRaidLimitSeconds 사용)
    const bossRaidLimitSeconds = bossRaidData.bossRaids[0].bossRaidLimitSeconds;

    // 현재시간 + bossRaidLimitSeconds * 1000(sec -> ms) = 만료시간
    const expiredTime = new Date(
      new Date().getTime() + bossRaidLimitSeconds * 1000,
    );

    // 레이드 레코드 생성
    const newRecord = await this.raidRecordRepository
      .create({
        user,
        expiredTime,
        level,
      })
      .save();

    return new EnterBossRaidResDto(true, newRecord.raidRecordId);
  }

  async canEnterRaid(): Promise<boolean> {
    // 마지막 레이드 입장 기록
    const lastRaidRecord = await this.raidRecordRepository.findOne({
      where: { raidRecordId: null },
      order: { raidRecordId: 'DESC' },
    });

    // 입장기록이 없을때
    if (!lastRaidRecord) return true;

    // 완료 여부 (스코어가 null이 아니면 완료)
    if (lastRaidRecord.score !== null) return true;

    // 만료 여부 (만료시간이 현재보다 과거일때)
    if (lastRaidRecord.expiredTime.getTime() < new Date().getTime())
      return true;

    return false;
  }
}
