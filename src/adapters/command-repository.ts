import Command from "../core/command";
import Repository from "../ports/repository";
import Storage from "../ports/storage";

export default class CommandRepository implements Repository<Command> {
  constructor(private commandStorage: Storage<Command>) { }

  async create(entity: Command): Promise<void> {
    await this.commandStorage.save(entity);
  }

  async findById(id: number): Promise<Command> {
    return await this.commandStorage.findById(id);
  }

  async findAll(): Promise<Command[]> {
    return await this.commandStorage.findAll();
  }

  async update(entity: Command) {
    await this.commandStorage.save(entity);
  }

  async delete(entity: Command) {
    await this.commandStorage.delete(entity);
  }

  async purge() {
    await this.commandStorage.purge();
  }
}
