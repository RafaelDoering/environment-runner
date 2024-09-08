import { Table, Column, Model, DataType, AllowNull, HasMany } from 'sequelize-typescript';

import Application from "../core/application";
import Storage from "../ports/storage";
import { CommandModel } from './command-sequelize-storage';

@Table({ modelName: 'Application' })
class ApplicationModel extends Model implements Application {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;

  @HasMany(() => CommandModel)
  commands: CommandModel[];
}

export default class ApplicationSequelizeStorage implements Storage<Application> {
  constructor() { }

  async save(entity: Application): Promise<Application> {
    const existingApplication = await ApplicationModel.findByPk(entity.id);
    if (existingApplication) {
      existingApplication.name = entity.name;
      existingApplication.description = entity.description;
      existingApplication.commands = entity.commands as CommandModel[];

      await existingApplication.save();
      for (const command of existingApplication.commands) {
        command.applicationId = existingApplication.id;
        command.id = (command as any).null;
        await command.save();

      }

      return existingApplication;
    }

    const application = new ApplicationModel({ ...entity });
    return application.save();
  }

  async findById(id: number): Promise<Application> {
    return ApplicationModel.findByPk(id);
  }

  async findAll(): Promise<Application[]> {
    return ApplicationModel.findAll({ include: [CommandModel] });
  }

  async delete(entity: Application) {
    await ApplicationModel.destroy({
      where: {
        id: entity.id,
      },
    });
  }

  async purge() {
    await ApplicationModel.destroy({
      truncate: true,
    });
  }
}

export { ApplicationModel };
