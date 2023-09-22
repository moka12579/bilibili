import { Context, EggContext, HTTPBody, HTTPController, HTTPMethod, HTTPMethodEnum } from '@eggjs/tegg';
import { fail, ok } from '../result/R';


@HTTPController({
  path: '/user',
})
export class UserController {

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'login',
  })
  async login(@HTTPBody() loginUser: any, @Context() ctx: EggContext) {
    if (loginUser.phone === undefined || loginUser.password === undefined) {
      return fail('参数验证不通过');
    }
    return ok(null, await ctx.service.userService.login());
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'reg',
  })
  async register(@HTTPBody() registerUser: any, @Context() ctx: EggContext) {
    const { phone, password } = registerUser;
    if (phone === undefined || password === undefined) {
      return fail('参数验证不通过');
    }
    await ctx.service.userService.register(phone, password, ctx);
    // console.log(this.userService.register(phone, password));
    return ok('ok', null);
  }

}
