import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: STRING(255), primaryKey: true, autoIncrement: true },
    phone: STRING(255),
    username: STRING(255),
    password: STRING(255),
    avatar: STRING(255),
    sex: STRING(255),
    birthday: DATE,
    sign: STRING(255),
    personal_signature: STRING(255),
    create_time: DATE,
    status: STRING(255),

  }, {
    freezeTableName: true,
    timestamps: false,
  });

  return User;
}
