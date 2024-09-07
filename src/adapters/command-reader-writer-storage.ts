import Command from "../core/command";
import Reader from "../ports/reader";
import Storage from "../ports/storage";
import Writer from "../ports/writer";

export default class CommandReaderWriterStorage implements Storage<Command> {
  constructor(private reader: Reader, private writer: Writer, private path?: string) { }

  async save(entity: Command) {
    const commands = await this.findAll();

    const command = await this.findById(entity.id);
    if (command) {
      for (const key of Object.keys(command)) {
        command[key] = entity[key];
      }
    } else {
      commands.push(entity);
    }

    await this.writer.write(JSON.stringify(commands), this.path);
  }

  async findById(id: number) {
    const commands = await this.findAll();

    return commands.find(command => command.id === id);
  }

  async findAll() {
    const commands = JSON.parse(await this.reader.read(this.path)) as Command[];

    return commands || [];
  }

  async delete(entity: Command) {
    let commands = await this.findAll();

    commands = commands.filter(command => command.id !== entity.id);
  }

  async purge() {
    await this.writer.write(JSON.stringify([]), this.path);
  }
}
