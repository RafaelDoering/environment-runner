import { CommandEntity } from "../core/command";
import Storage from "../ports/storage";

export default class TodoInMemoryStorage implements Storage<CommandEntity> {
  private commands: CommandEntity[] = [];

  constructor() { }

  async save(entity: CommandEntity): Promise<void> {
    const command = await this.findById(entity.id);
    if (command) {
      for (const key of Object.keys(command)) {
        command[key] = entity[key];
      }
    } else {
      this.commands.push(entity);
    }
  }

  async findById(id: string): Promise<CommandEntity> {
    return this.commands.find(command => command.id === id);
  }

  async findAll(): Promise<CommandEntity[]> {
    return this.commands;
  }

  async delete(entity: CommandEntity): Promise<void> {
    this.commands = this.commands.filter(command => command.id !== entity.id);
  }
}
