import { AccessLevel, EggContext, SingletonProto } from '@eggjs/tegg';
import { v1 as uuidv1 } from 'uuid';


@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
class UserService {

  async login(phone: string, password:string, ctx: EggContext) {
    const user = await ctx.model.User.findOne({
      where: {
        phone,
      },
    });
    if (!user) {
      return false;
    }
    const b = ctx.compare(password, user.getDataValue('password'));
    if (b) {
      const token = ctx.app.jwt.sign(user.getDataValue('id'), ctx.app.config.jwt.secret);
      ctx.cookies.set('token', token);
      await ctx.app.redis.set(user.getDataValue('id'), token, 'EX', 604800);
      return token;
    }
    return false;
  }

  async register(phone: string, password: string, ctx: EggContext, sign: string) {
    const bcryptPassword = await ctx.genHash(password);
    const id = uuidv1();
    const username = '用户' + Math.floor(Math.random() * 100000);
    const user = await ctx.model.User.create({
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
      sign,
    });
    return !!user;
  }
}

module.exports = UserService;
