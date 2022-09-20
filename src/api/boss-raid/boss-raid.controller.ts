import { Body, Controller, Post } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { EnterBossRaidDto } from './dtos/enterBossRaid.dto';

@Controller('boss-raid')
export class BossRaidController {
  constructor(private readonly bossRaidService: BossRaidService) {}

  @Post('enter')
  enter(@Body() enterBossRaidDto: EnterBossRaidDto) {
    return this.bossRaidService.enter(enterBossRaidDto);
  }
}
