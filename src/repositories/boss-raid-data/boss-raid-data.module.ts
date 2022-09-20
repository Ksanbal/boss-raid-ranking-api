import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossRaidDataEntity } from './entities/boss-raid-data.entity';
import { BossRaidDataRepository } from './boss-raid-data.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([BossRaidDataEntity]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
  ],
  providers: [BossRaidDataRepository],
  exports: [BossRaidDataRepository],
})
export class BossRaidDataModule {}
