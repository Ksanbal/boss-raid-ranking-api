import { UserEntity } from 'src/api/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'ranking',
})
export class RankingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
  })
  ranking: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'userId',
  })
  user: UserEntity;

  @Column({
    type: 'int',
  })
  totalScore: number;
}
