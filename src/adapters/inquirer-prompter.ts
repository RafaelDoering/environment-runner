import inquirer from "inquirer";

import Prompter from "../ports/prompter";

class InquirerPrompter implements Prompter {
  async input(question: string) {
    return (await inquirer.prompt([
      {
        type: "input",
        name: "answer",
        message: question,
      },
    ])).answer;
  }

  async list(question: string, choices: string[]) {
    return (await inquirer.prompt([
      {
        type: "list",
        name: "answer",
        message: question,
        choices
      },
    ])).answer;
  }
}

export default InquirerPrompter;
