import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 유저 생성 API
   */
  @Post()
  join() {
    return this.userService.join();
  }

  /**
   * 유저 조회 API
   * @param userId 유저 id
   */
  @Get(':userId')
  retrieve(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.retrieve(userId);
  }
}
