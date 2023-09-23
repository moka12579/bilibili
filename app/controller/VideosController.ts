import { Context, EggContext, HTTPController, HTTPMethod, HTTPMethodEnum } from '@eggjs/tegg';
import { ok } from '../result/R';

@HTTPController({
  path: '/videos',
})
export class VideosController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'getVideos',
  })
  async getVideos(@Context() ctx: EggContext) {
    console.log(ctx);
    return ok('ok', null);
  }
}
