#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';

import { version as appVersion } from '../../package.json';
import { cli } from '../assets/json';
import helloCommand from './commands';
import packageCommand from './package';

console.log(figlet.textSync('Lambda Layer Packager'));

new Command()
  .name('packager')
  .version(appVersion, '-v, --version', 'output the current version')
  .description(cli.default.description)
  .summary(cli.default.summary)
  .addHelpCommand(false)
  .addCommand(helloCommand())
  .addCommand(packageCommand())
  .parse();
