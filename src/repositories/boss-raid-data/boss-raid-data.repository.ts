import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BossRaidDataEntity } from './entities/boss-raid-data.entity';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

@Injectable()
export class BossRaidDataRepository {
  constructor(
    @InjectRepository(BossRaidDataEntity)
    private readonly bossRaidDataRepository: Repository<BossRaidDataEntity>,

    private readonly httpService: HttpService,
  ) {}

  /**
   * 보스레이드 정적 데이터 get
   */
  async getBossRaidData() {
    // db에 저장된 데이터가 유효한지 체크
    const bossRaidData = await this.bossRaidDataRepository.findOne({
      where: { id: null },
    });

    // 유효한 경우 (bossRaidData가 존재하고, updateAt이 1일 이내인 경우)
    if (bossRaidData) {
      const elapsedDay =
        (new Date().getTime() - bossRaidData.updateAt.getTime()) /
        (1000 * 60 * 60 * 24);

      if (elapsedDay < 1) {
        return bossRaidData.data;
      }
    }

    // 만료인 경우 request후 새로 저장 & return
    console.log('request!');
    const resData = await this.httpService
      .get(
        'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
      )
      .toPromise();

    if (!bossRaidData) {
      console.log('create');
      // 없으면 생성
      await this.bossRaidDataRepository
        .create({
          data: resData.data,
        })
        .save();
    } else {
      console.log('update');
      await this.bossRaidDataRepository.update(
        { id: bossRaidData.id },
        { data: resData.data },
      );
    }

    return resData.data;
  }
}
