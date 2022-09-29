import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'ranking_job',
})
export class RankingJobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-json',
  })
  rankingData: RankingData;
}

interface RankingData {
  userId: number;
  totalScore: number;
}
