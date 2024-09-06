import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Writer from "../../ports/writer";
import Command from "../command";
import Action from "./action";

const FILE_PATH = "commands.json";

class CreateAction implements Action {
  constructor(private logger: Logger, private writer: Writer, private prompter: Prompter) { }

  public async run() {
    const commands: Command[] = [];

    let i = 0
    while (true) {
      const command = await this.prompter.input("Whats is the command?");
      const description = await this.prompter.input("Whats is this command description?");
      const isFinished = await this.prompter.list("That is it?", ["no", "yes"]);
      commands.push({
        id: i.toString(),
        command,
        description
      });
      i++;
      if (isFinished === "yes") {
        break;
      }
    }

    this.logger.green(JSON.stringify(commands));

    await this.writer.write(JSON.stringify(commands), FILE_PATH);
  }
}

export default CreateAction;
