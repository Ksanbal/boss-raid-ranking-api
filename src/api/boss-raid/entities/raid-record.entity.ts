import { UserEntity } from 'src/api/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'raid_record',
})
export class RaidRecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  raidRecordId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'userId',
  })
  user: UserEntity;

  @CreateDateColumn({})
  enterTime: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  endTime: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  score: number;
}
