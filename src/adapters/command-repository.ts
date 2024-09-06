import { CommandEntity } from "../core/command";
import Repository from "../ports/repository";
import Storage from "../ports/storage";

export default class CommandRepository implements Repository<CommandEntity> {
  constructor(private commandStorage: Storage<CommandEntity>) { }

  async create(entity: CommandEntity): Promise<void> {
    await this.commandStorage.save(entity);
  }

  async findById(id: string): Promise<CommandEntity> {
    return await this.commandStorage.findById(id);
  }

  async findAll(): Promise<CommandEntity[]> {
    return await this.commandStorage.findAll();
  }

  async updateById(id: string, entity: CommandEntity): Promise<void> {
    entity.id = id;

    await this.commandStorage.save(entity);
  }

  async deleteById(entity: CommandEntity): Promise<void> {
    await this.commandStorage.delete(entity);
  }
}
