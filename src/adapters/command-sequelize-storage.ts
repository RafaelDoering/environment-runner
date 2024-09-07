import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

import Command from "../core/command";
import Storage from "../ports/storage";

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
}

export default class CommandSequelizeStorage implements Storage<Command> {
  constructor() { }

  async save(entity: Command) {
    const command = new CommandModel({ ...entity });
    await command.save();
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
