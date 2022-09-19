import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaidRecordEntity } from '../boss-raid/entities/raid-record.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RaidRecordEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
