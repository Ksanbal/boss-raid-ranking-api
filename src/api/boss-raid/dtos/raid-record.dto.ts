import { OmitType } from '@nestjs/swagger';
import { RaidRecordEntity } from '../entities/raid-record.entity';

export class RaidRecordDto extends OmitType(RaidRecordEntity, ['user']) {
  constructor(raidRecord: RaidRecordEntity) {
    super();
    this.raidRecordId = raidRecord.raidRecordId;
    this.score = raidRecord.score ?? 0;
    this.enterTime = raidRecord.enterTime;
    this.endTime = raidRecord.endTime;
  }
}
