import { CommandEntity } from "../core/command";
import Repository from "../ports/repository";
import Storage from "../ports/storage";

export default class TodoRepository implements Repository<CommandEntity> {
  constructor(private todoStorage: Storage<CommandEntity>) { }

  async create(entity: CommandEntity): Promise<void> {
    await this.todoStorage.save(entity);
  }

  async findById(id: string): Promise<CommandEntity> {
    return await this.todoStorage.findById(id);
  }

  async findAll(): Promise<CommandEntity[]> {
    return await this.todoStorage.findAll();
  }

  async updateById(id: string, entity: CommandEntity): Promise<void> {
    entity.id = id;

    await this.todoStorage.save(entity);
  }

  async deleteById(entity: CommandEntity): Promise<void> {
    await this.todoStorage.delete(entity);
  }
}
