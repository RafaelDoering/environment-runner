interface Command {
  id?: number;
  description: string;
  command: string;
}

export default Command;

export class CommandEntity implements Command {
  public id: number;
  public description: string;
  public command: string;

  constructor(command: Command) {
    this.id = command.id;
    this.description = command.description;
    this.command = command.command;
  }
};
