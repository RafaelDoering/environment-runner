import { Sequelize } from 'sequelize-typescript';

import { CommandModel } from './command-sequelize-storage';

export default class Database {
  database: Sequelize;

  initialize() {
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite3',
      models: [CommandModel],
    });
  }

  async reset() {
    return this.database.sync({ force: true });
  }
};
