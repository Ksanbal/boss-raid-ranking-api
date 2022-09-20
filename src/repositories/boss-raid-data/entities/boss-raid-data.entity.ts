import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'boss_raid_data',
})
export class BossRaidDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-json',
  })
  data: object;

  @UpdateDateColumn({})
  updateAt: Date;
}
