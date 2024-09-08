import Command from "../core/command";
import Storage from "../ports/storage";

export default class CommandInMemoryStorage implements Storage<Command> {
  private commands: Command[] = [];

  constructor() { }

  async save(entity: Command) {
    const command = await this.findById(entity.id);
    if (command) {
      for (const key of Object.keys(command)) {
        command[key] = entity[key];
      }
    } else {
      this.commands.push(entity);
    }

    return entity;
  }

  async findById(id: number) {
    return this.commands.find(command => command.id === id);
  }

  async findAll() {
    return this.commands;
  }

  async delete(entity: Command) {
    this.commands = this.commands.filter(command => command.id !== entity.id);
  }

  async purge() {
    this.commands = [];
  }
}
