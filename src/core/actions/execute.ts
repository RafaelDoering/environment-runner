import { exec } from "child_process";

import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Reader from "../../ports/reader";
import Command from "../command";
import Action from "./action";

class ExecuteAction implements Action {
  constructor(private logger: Logger, private reader: Reader, private prompter: Prompter) { }

  public async run() {
    const filePath = await this.prompter.input("What is file?")

    const file = await this.reader.read(filePath);

    const parsedCommands: Command[] = JSON.parse(file);

    let commandsString = "";
    for (const command of parsedCommands) {
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
