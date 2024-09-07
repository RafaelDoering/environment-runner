import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Repository from "../../ports/repository";
import Command from "../command";
import Action from "./action";

class CreateAction implements Action {
  constructor(
    private prompter: Prompter,
    private repository: Repository<Command>
  ) { }

  public async run() {
    const isToLoadPrevious = await this.prompter.list("Load previous?", ["no", "yes"]);

    let index = 0;
    if (isToLoadPrevious === "yes") {
      const previousCommands = await this.repository.findAll();
      if (previousCommands.length > 0) {
        for (const command of previousCommands) {
          await this.repository.create(command);
        }

        index = previousCommands.length;
      }
    } else {
      await this.repository.purge();
    }

    while (true) {
      const command = await this.prompter.input("Whats is the command?");
      const description = await this.prompter.input("Whats is this command description?");
      const isFinished = await this.prompter.list("That is it?", ["no", "yes"]);

      await this.repository.create({
        id: index.toString(),
        command,
        description
      })

      if (isFinished === "yes") {
        break;
      }

      index++;
    }
  }
}

export default CreateAction;
