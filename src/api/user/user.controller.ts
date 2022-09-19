import { Controller, Post } from '@nestjs/common';
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
}
