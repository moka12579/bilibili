// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportUserController from '../../../app/controller/UserController';
import ExportVideosController from '../../../app/controller/VideosController';

declare module 'egg' {
  interface IController {
    userController: ExportUserController;
    videosController: ExportVideosController;
  }
}
