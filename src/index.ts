#!/usr/bin/env node

import { Command as Cmd } from 'commander';

import FileReader from './adapters/file-reader';
import FileWriter from './adapters/file-writer';
import ChalkLogger from './adapters/chalk-logger';
import InquirerPrompter from './adapters/inquirer-prompter';
import CreateAction from './core/actions/create';
import ExecuteAction from './core/actions/execute';

const reader = new FileReader();
const writer = new FileWriter();
const logger = new ChalkLogger();
const prompter = new InquirerPrompter();
const createAction = new CreateAction(logger, writer, prompter);
const executeAction = new ExecuteAction(logger, reader, prompter);

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
