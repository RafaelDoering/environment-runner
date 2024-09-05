#!/usr/bin/env node

import fs from 'fs';

import chalk from 'chalk';
import { Command as Cmd } from 'commander';
import inquirer from 'inquirer';

import Command from './core/command';
import { exec } from 'child_process';

const program = new Cmd();

program
  .version("0.0.1")
  .description("Environment Runner");

program
  .command('create')
  .description('Create commands')
  .action(async () => {
    const commands: Command[] = [];

    let i = 0
    while (true) {
      const { command, description, isFinished } = await inquirer
        .prompt([
          {
            type: "input",
            name: "command",
            message: "Whats is the command?",
          },
          {
            type: "input",
            name: "description",
            message: "Whats is this command description?",
          },
          {
            type: "list",
            name: "isFinished",
            message: "That is it?",
            choices: ["no", "yes"]
          },
        ])
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
    console.log(chalk.green(JSON.stringify(commands)));
    await fs.writeFileSync("commands.json", JSON.stringify(commands));
  });

program
  .command('execute')
  .description('Execute commands')
  .action(async () => {
    const { filePath } = await inquirer
      .prompt([
        {
          type: "input",
          name: "filePath",
          message: "What is file?",
        },
      ])

    const file = await fs.readFileSync(filePath, "utf8");

    const parsedCommands: Command[] = JSON.parse(file);

    let commandsString = "";
    for (const command of parsedCommands) {
      commandsString += command.command + " && ";
    }
    commandsString = commandsString.substring(0, commandsString.length - 4);
    const child = exec(commandsString);

    child.stdout.on('data', (data) => {
      console.log(chalk.green(data.toString()));
    });

    child.stderr.on('data', (data) => {
      console.log(chalk.red(data.toString()));
    });
  });

program.parse();
