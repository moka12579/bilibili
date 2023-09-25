'use strict';

import { Application } from 'egg';


export default function(app: Application) {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Model = app.model.define('videos', {
    id: {type: STRING(255), primaryKey: true, autoIncrement: true},
    title: STRING(255),
    video_url: STRING(255),
    create_time: DATE,
    brief_introduction: STRING(255),
    user_id: STRING(255),
    types: STRING(255),
    source: STRING(255),
    like_total: INTEGER,
    share_total: INTEGER,
    status: STRING(255),
    cover: STRING(255),
    collect_total: INTEGER,
    partition_id: INTEGER,
    classification_id: INTEGER,
  });
  // Video.hasOne(app.model.User);

  return class videos extends Model {
    static associate() {
      app.model.Video.hasOne(app.model.User, { foreignKey: 'id', sourceKey: 'user_id' });
      app.model.Video.belongsTo(app.model.User);
    }
  };

}
