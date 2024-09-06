import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Repository from "../../ports/repository";
import Command from "../command";
import Action from "./action";

class CreateAction implements Action {
  constructor(
    private logger: Logger,
    private prompter: Prompter,
    private repository: Repository<Command>
  ) { }

  public async run() {
    let index = 0
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
