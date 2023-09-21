import { AccessLevel, Inject, SingletonProto } from '@eggjs/tegg';
import { IModel } from 'egg';


@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService {

  @Inject()
  model: IModel;

  async login() {
    return this.model.User.findAll();
  }
}
