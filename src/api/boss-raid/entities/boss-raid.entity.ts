import { UserEntity } from 'src/api/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'boss_raid',
})
export class BossRaidEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  canEnter: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'entered_user_id',
    referencedColumnName: 'userId',
  })
  enteredUserId: UserEntity;
}
