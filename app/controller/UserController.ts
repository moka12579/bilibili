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
    const { phone, password } = loginUser;
    if (phone === undefined || password === undefined) {
      return fail('参数验证不通过');
    }
    const b = await ctx.service.userService.login(phone, password, ctx);
    if (typeof b === 'string') {
      return ok(null, b);
    }
    return fail('登录失败');
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
    const a = {
      ip: ctx.ip,
      ua: ctx.headers['user-agent'],
      host: ctx.host,
      time: new Date().toLocaleString(),
    };
    const sign = await ctx.genHash(JSON.stringify(a));
    const b = await ctx.service.userService.register(phone, password, ctx, sign);
    if (b) {
      ctx.cookies.set('sign', b);
      return ok('注册成功', null);
    }
    return fail('注册失败');
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'h',
  })
  async h(@Context() ctx: EggContext) {
    return await ctx.model.User.findAll({
      subQuery: false,
      include: {
        model: ctx.model.Video,
        as: 'videos',
      },
    });
  }
}
