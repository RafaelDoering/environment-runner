#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .version("0.0.1")
  .description("Environment Runner")
  .option('--first')
  .option('-s, --separator <char>');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
