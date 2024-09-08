#!/usr/bin/env node

import { Command as Cmd } from 'commander';

import ChalkLogger from './adapters/chalk-logger';
import InquirerPrompter from './adapters/inquirer-prompter';
import RunAction from './core/actions/run';
import ApplicationStorage from './adapters/application-reader-writer-storage';
import ApplicationRepository from './adapters/application-repository';
import ManageAction from './core/actions/manage';
import FileReader from './adapters/file-reader';
import FileWriter from './adapters/file-writer';

const FILE_PATH = "./database.json";

async function main() {
  const logger = new ChalkLogger();
  const prompter = new InquirerPrompter();
  const reader = new FileReader();
  const writer = new FileWriter();
  const applicationStorage = new ApplicationStorage(reader, writer, FILE_PATH);
  const applicationRepository = new ApplicationRepository(applicationStorage);
  const runAction = new RunAction(logger, prompter, applicationRepository);
  const applicationAction = new ManageAction(logger, prompter, applicationRepository);

  const program = new Cmd();

  program
    .version("0.0.1")
    .description("Environment Runner");

  program
    .command('run')
    .description('Run application commands')
    .action(async () => runAction.run());

  program
    .command('manage')
    .description('Manage applications')
    .action(async () => applicationAction.run());

  program.parse();
}

main();
