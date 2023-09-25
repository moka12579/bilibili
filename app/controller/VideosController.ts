import { Context, EggContext, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPQuery } from '@eggjs/tegg';
import { ok } from '../result/R';

@HTTPController({
  path: '/videos',
})
export class VideosController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'getVideos',
  })
  async getVideos(@HTTPQuery() pageSize: string, @HTTPQuery() pageNum: string, @Context() ctx: EggContext) {
    console.log(pageSize);
    console.log(pageNum);
    console.log(ctx);
    return ok('ok', await ctx.service.videosService.getAll(pageSize, pageNum, ctx));
  }
}
