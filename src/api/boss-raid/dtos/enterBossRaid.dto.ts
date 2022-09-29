import { ApiProperty } from '@nestjs/swagger';

export class EnterBossRaidDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  level: number;
}
