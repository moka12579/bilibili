import { validationFailed } from '../result/R';

module.exports = app => {
  return async function auth(ctx, next) {
    const routerAuth = [ '/user/login', '/user/register' ];
    const url = ctx.url;
    const flag = routerAuth.includes(url);
    if (flag) {
      await next();
    } else {
      let token = ctx.headers.authorization ? ctx.headers.authorization : '';
      token = token.substring(7);
      // 解析token
      try {
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        const u = app.redis.get(decode);
        if (u === null) {
          throw Error('token已过期');
        }
        await next();
      } catch (err) {
        ctx.body = validationFailed('token未携带或已过期');
      }
    }
  };
};
