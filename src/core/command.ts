type Command = {
  id: string;
  description: string;
  command: string;
}

export default Command;

export class CommandEntity {
  public id: string;
  public description: string;
  public command: string;

  constructor(command: Command) {
    this.id = command.id;
    this.description = command.description;
    this.command = command.command;
  }
};
