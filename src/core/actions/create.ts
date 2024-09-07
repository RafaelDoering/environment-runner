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

    if (isToLoadPrevious === "no") {
      await this.repository.purge();
    }

    while (true) {
      const command = await this.prompter.input("Whats is the command?");
      const description = await this.prompter.input("Whats is this command description?");
      const isFinished = await this.prompter.list("That is it?", ["no", "yes"]);

      await this.repository.create({
        command,
        description
      })

      if (isFinished === "yes") {
        break;
      }
    }
  }
}

export default CreateAction;
