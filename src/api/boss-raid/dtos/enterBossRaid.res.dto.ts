export class EnterBossRaidResDto {
  isEntered: boolean;
  raidRecordId: number;

  constructor(isEntered: boolean, raidRecordId: number) {
    this.isEntered = isEntered;
    this.raidRecordId = raidRecordId;
  }
}
