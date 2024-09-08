import { Sequelize } from 'sequelize-typescript';

import { ApplicationModel } from './application-sequelize-storage';
import { CommandModel } from './command-sequelize-storage';

export default class Database {
  database: Sequelize;

  initialize() {
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite3',
      logging: false,
      models: [CommandModel, ApplicationModel],
    });
  }

  async reset() {
    return this.database.sync({ force: true });
  }
};
