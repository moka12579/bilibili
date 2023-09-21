import { HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from '@eggjs/tegg';
import { UserService } from '@/module/service/UserService';


@HTTPController({
  path: '/user',
})
export class UserController {

  @Inject()
  userService: UserService;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'login',
  })
  async login() {
    return this.userService.login();
  }

}
