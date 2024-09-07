#!/usr/bin/env node

import { Command as Cmd } from 'commander';

import FileReader from './adapters/file-reader';
import FileWriter from './adapters/file-writer';
import ChalkLogger from './adapters/chalk-logger';
import InquirerPrompter from './adapters/inquirer-prompter';
import CreateAction from './core/actions/create';
import ExecuteAction from './core/actions/execute';
import CommandRepository from './adapters/command-repository';
import CommandReaderWriterStorage from './adapters/command-reader-writer-storage';

const FILE_PATH = "commands.json";

const reader = new FileReader();
const writer = new FileWriter();
const logger = new ChalkLogger();
const prompter = new InquirerPrompter();
const commandStorage = new CommandReaderWriterStorage(reader, writer, FILE_PATH);
const commandRepository = new CommandRepository(commandStorage);
const createAction = new CreateAction(prompter, commandRepository);
const executeAction = new ExecuteAction(logger, prompter, commandRepository);

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

program.parse();
