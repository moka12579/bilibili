import { AccessLevel, EggContext, SingletonProto } from '@eggjs/tegg';


@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
class VideosService {

  async getAll(pageSize, pageNum, ctx: EggContext) {
    console.log(pageSize);
    console.log(pageNum);
    console.log(ctx);
    return await ctx.model.Video.findAll({
      subQuery: false,
      include: {
        model: ctx.model.User,
      },
    });
  }

}

module.exports = VideosService;
