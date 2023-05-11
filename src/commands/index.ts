#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';

import cli from '../../assets/json/cli.json';
import app from '../../package.json';
import hello_command from './commands';
import package_command from './package';

const command = new Command();

console.log(figlet.textSync('Lambda Layer Packager'));

command
  .name('packager')
  .version(app.version, '-v, --version', 'output the current version')
  .description(cli.default.description)
  .summary(cli.default.summary)
  .addHelpCommand(false)
  .addCommand(hello_command())
  .addCommand(package_command())
  .parse();
