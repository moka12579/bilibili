// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportUserController from '../../../app/controller/UserController';

declare module 'egg' {
  interface IController {
    userController: ExportUserController;
  }
}
