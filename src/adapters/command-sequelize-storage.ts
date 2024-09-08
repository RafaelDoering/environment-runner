import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';

import Command from "../core/command";
import Storage from "../ports/storage";
import { ApplicationModel } from './application-sequelize-storage';
import Application from '../core/application';

@Table({ modelName: 'Command' })
class CommandModel extends Model implements Command {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  command: string;

  @ForeignKey(() => ApplicationModel)
  @Column(DataType.INTEGER)
  applicationId: number;

  @BelongsTo(() => ApplicationModel, 'applicationId')
  application: Application;
}

export default class CommandSequelizeStorage implements Storage<Command> {
  constructor() { }

  async save(entity: Command): Promise<Command> {
    const command = new CommandModel({ ...entity });
    return command.save();
  }

  async findById(id: number) {
    return CommandModel.findByPk(id);
  }

  async findAll() {
    return CommandModel.findAll();
  }

  async delete(entity: Command) {
    await CommandModel.destroy({
      where: {
        id: entity.id,
      },
    });
  }

  async purge() {
    await CommandModel.destroy({
      truncate: true,
    });
  }
}

export { CommandModel };
