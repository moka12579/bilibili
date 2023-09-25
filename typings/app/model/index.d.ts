// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportUser from '../../../app/model/user';
import ExportVideo from '../../../app/model/video';

declare module 'egg' {
  interface IModel {
    User: ReturnType<typeof ExportUser>;
    Video: ReturnType<typeof ExportVideo>;
  }
}
