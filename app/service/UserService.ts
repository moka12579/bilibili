import { AccessLevel, EggContext, Inject, SingletonProto } from '@eggjs/tegg';
import { IModel } from 'egg';
import { v1 as uuidv1 } from 'uuid';


@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
class UserService {

  @Inject()
  model: IModel;

  async login() {
    return this.model.User.findAll();
  }

  async register(phone: string, password: string, ctx: EggContext) {
    const bcryptPassword = await ctx.genHash(password);
    const id = uuidv1();
    const username = '用户' + Math.floor(Math.random() * 100000);
    const a = {
      ip: ctx.ip,
      ua: ctx.headers['user-agent'],
      host: ctx.host,
      time: new Date().toLocaleString(),
    };
    return await ctx.model.User.create({
      id,
      phone,
      username,
      password: bcryptPassword,
      avatar: 'https://himg.bdimg.com/sys/portrait/item/public.1.cbfe969d.TUaFXIL8ysRjRqs_uYMMpw.jpg',
      sex: '未知',
      birthday: new Date('1970-01-01').toLocaleDateString(),
      personal_signature: '这个人很懒，什么都没有留下',
      create_time: new Date().toLocaleString(),
      status: '0',
      sign: await ctx.genHash(JSON.stringify(a)),
    });
  }
}

module.exports = UserService;
