import { RaidRecordDto } from 'src/api/boss-raid/dtos/raid-record.dto';
import { RaidRecordEntity } from 'src/api/boss-raid/entities/raid-record.entity';

export class UserDto {
  totalScore: number;
  bossRaidHistory: RaidRecordDto[];

  constructor(totalScore: number, raidRecords: RaidRecordEntity[]) {
    this.totalScore = totalScore;
    this.bossRaidHistory = raidRecords.map(
      (raidRecord) => new RaidRecordDto(raidRecord),
    );
  }
}
