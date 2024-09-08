import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Repository from "../../ports/repository";
import Application from "../application";
import Command from "../command";
import Action from "./action";

class ApplicationAction implements Action {
  constructor(
    private logger: Logger,
    private prompter: Prompter,
    private applicationRepository: Repository<Application>,
    private commandRepository: Repository<Command>
  ) { }

  public async run() {
    const applications = await this.applicationRepository.findAll();

    const applicationNames = applications.map((application) => application.name);

    const applicationName = await this.prompter.list("What application?", [...applicationNames, "Create new application"]);

    let application;
    if (applicationName === "Create new application") {
      const name = await this.prompter.input("Name: ");
      const description = await this.prompter.input("Description: ");

      application = await this.applicationRepository.create({
        name,
        description,
        commands: []
      })
    } else {
      application = applications.find((application) => application.name === applicationName);
    }

    while (true) {
      const action = await this.prompter.list("What you want to do?", ["Create command", "List commands"]);


      if (action === "List commands") {
        for (const command of application.commands) {
          this.logger.green(command.command);
        }
      } else {
        const command = await this.prompter.input("Command?");
        const description = await this.prompter.input("Description?");
        const savedCommand = await this.commandRepository.create({ command, description });

        application.commands.push(savedCommand);

        await this.applicationRepository.update(application);
      }
    }
  }
}

export default ApplicationAction;
