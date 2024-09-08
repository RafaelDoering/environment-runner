import Logger from "../../ports/logger";
import Prompter from "../../ports/prompter";
import Repository from "../../ports/repository";
import Application from "../application";
import Action from "./action";

enum Manage {
  NAME = "Name",
  DESCRIPTION = "Description",
  ABSOLUTE_PATH = "Absolute path",
  UP_COMMANDS = "Up Commands",
  DOWN_COMMANDS = "Down commands"
}

class ManageAction implements Action {
  constructor(
    private logger: Logger,
    private prompter: Prompter,
    private applicationRepository: Repository<Application>,
  ) { }

  public async run() {
    const application = await this.getApplication();

    while (true) {
      const manage = await this.prompter.list("What you want to manage?", [
        Manage.NAME, Manage.DESCRIPTION, Manage.ABSOLUTE_PATH, Manage.UP_COMMANDS, Manage.DOWN_COMMANDS
      ]);

      if (manage === Manage.UP_COMMANDS) {
        await this.manageUpCommands(application);
      } else {
        this.logger.red("Not implemented yet")
      }
    }
  }

  private async getApplication() {
    const applications = await this.applicationRepository.findAll();

    const applicationNames = applications.map((application) => application.name);

    const applicationName = await this.prompter.list("What application?", [...applicationNames, "Create new application"]);

    let application: Application;
    if (applicationName === "Create new application") {
      const name = await this.prompter.input("Name: ");
      const description = await this.prompter.input("Description: ");
      const absolutePath = await this.prompter.input("Absolute path: ");

      application = await this.applicationRepository.create({
        name,
        description,
        absolutePath,
        upCommands: [],
        downCommands: [],
      })
    } else {
      application = applications.find((application) => application.name === applicationName);
    }

    return application;
  }

  private async manageUpCommands(application: Application) {
    const action = await this.prompter.list("What you want to do?", ["Create new", "List"]);

    if (action === "List") {
      for (const command of application.upCommands) {
        this.logger.green(command.command);
      }
    } else {
      const command = await this.prompter.input("Command: ");
      const description = await this.prompter.input("Description: ");

      application.upCommands.push({ command, description });

      await this.applicationRepository.update(application);
    }
  }
}

export default ManageAction;
