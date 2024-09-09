import Prompter from "../../ports/prompter";
import Action from "./action";
import Repository from "../../ports/repository";
import Application, { Command } from "../application";
import Terminal from "../../ports/terminal";

class RunAction implements Action {
  constructor(
    private prompter: Prompter,
    private repository: Repository<Application>,
    private terminal: Terminal
  ) { }

  public async run() {
    const applications = await this.repository.findAll();

    const applicationNames = applications.map((application) => application.name);

    const applicationName = await this.prompter.list("What application?", [...applicationNames]);

    const application = applications.find((application) => application.name === applicationName);

    const commandsString = this.getCommandsString(application.absolutePath, application.upCommands)

    this.terminal.execute(commandsString);
  }

  private getCommandsString(absolutePath: string, commands: Command[]) {
    let commandsString = `cd ${absolutePath} && `;
    for (const command of commands) {
      commandsString += `${command.command} && `;
    }
    commandsString = commandsString.substring(0, commandsString.length - 4);

    return commandsString;
  }
}

export default RunAction;
