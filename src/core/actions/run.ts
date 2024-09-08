import { exec } from "child_process";

import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Action from "./action";
import Repository from "../../ports/repository";
import Application from "../application";

class RunAction implements Action {
  constructor(
    private logger: Logger,
    private prompter: Prompter,
    private repository: Repository<Application>
  ) { }

  public async run() {
    const applications = await this.repository.findAll();

    const applicationNames = applications.map((application) => application.name);

    const applicationName = await this.prompter.list("What application?", [...applicationNames]);

    const application = applications.find((application) => application.name === applicationName);

    let commandsString = `cd ${application.absolutePath} && `;
    for (const command of application.upCommands) {
      commandsString += `${command.command} && `;
    }
    commandsString = commandsString.substring(0, commandsString.length - 4);
    const child = exec(commandsString);

    child.stdout.on('data', (data) => {
      this.logger.green(data.toString());
    });

    child.stderr.on('data', (data) => {
      this.logger.red(data.toString());
    });
  }
}

export default RunAction;
