#!/usr/bin/env node

import { Command as Cmd } from 'commander';

import ChalkLogger from './adapters/chalk-logger';
import InquirerPrompter from './adapters/inquirer-prompter';
import CreateAction from './core/actions/create';
import ExecuteAction from './core/actions/execute';
import CommandRepository from './adapters/command-repository';
import Database from './adapters/sequelize';
import CommandSequelizeStorage from './adapters/command-sequelize-storage';
import ApplicationSequelizeStorage from './adapters/application-sequelize-storage';
import ApplicationRepository from './adapters/application-repository';
import ApplicationAction from './core/actions/applications';

async function main() {
  const database = new Database();
  database.initialize();

  const logger = new ChalkLogger();
  const prompter = new InquirerPrompter();
  const commandStorage = new CommandSequelizeStorage();
  const commandRepository = new CommandRepository(commandStorage);
  const createAction = new CreateAction(prompter, commandRepository);
  const executeAction = new ExecuteAction(logger, prompter, commandRepository);
  const applicationStorage = new ApplicationSequelizeStorage();
  const applicationRepository = new ApplicationRepository(applicationStorage);
  const applicationAction = new ApplicationAction(logger, prompter, applicationRepository, commandRepository);

  const program = new Cmd();

  program
    .version("0.0.1")
    .description("Environment Runner");

  program
    .command('create')
    .description('Create commands')
    .action(async () => createAction.run());

  program
    .command('execute')
    .description('Execute commands')
    .action(async () => executeAction.run());

  program
    .command('application')
    .description('Manage applications')
    .action(async () => applicationAction.run());

  program.parse();
}

main();
