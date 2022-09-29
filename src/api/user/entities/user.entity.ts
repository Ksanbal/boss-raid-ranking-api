import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  userId: number;
}
