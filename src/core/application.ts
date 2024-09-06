import Command from "./command";

type Application = {
  id: string;
  name: string;
  description: string;
  commands: Command[];
}

export default Application;

export class ApplicationEntity {
  public id: string;
  public name: string;
  public description: string;
  public commands: Command[];

  constructor(application: Application) {
    this.id = application.id;
    this.name = application.name;
    this.description = application.description;
    this.commands = application.commands;
  }
};
