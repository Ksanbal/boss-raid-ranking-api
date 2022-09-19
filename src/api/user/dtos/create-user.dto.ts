import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends PickType(UserEntity, ['userId']) {
  constructor(user: UserEntity) {
    super();
    this.userId = user.userId;
  }
}
