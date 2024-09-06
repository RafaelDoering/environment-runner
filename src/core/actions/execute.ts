import { exec } from "child_process";

import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Command from "../command";
import Action from "./action";
import Repository from "../../ports/repository";

class ExecuteAction implements Action {
  constructor(
    private logger: Logger,
    private prompter: Prompter,
    private repository: Repository<Command>
  ) { }

  public async run() {
    const isToRun = await this.prompter.list("Run?", ["yes", "no"]);
    if (isToRun !== "yes") {
      return;
    }

    const commands = await this.repository.findAll();

    let commandsString = "";
    for (const command of commands) {
      commandsString += command.command + " && ";
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

export default ExecuteAction;
