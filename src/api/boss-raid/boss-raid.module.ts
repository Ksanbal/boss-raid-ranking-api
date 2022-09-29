import { Module } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { BossRaidController } from './boss-raid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaidRecordEntity } from './entities/raid-record.entity';
import { BossRaidDataEntity } from 'src/repositories/boss-raid-data/entities/boss-raid-data.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BossRaidDataModule } from 'src/repositories/boss-raid-data/boss-raid-data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RaidRecordEntity,
      BossRaidDataEntity,
    ]),
    BossRaidDataModule,
  ],
  controllers: [BossRaidController],
  providers: [BossRaidService],
})
export class BossRaidModule {}
