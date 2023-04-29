import chalk from 'chalk';
import figlet from 'figlet';

import { Command, ux } from '@oclif/core';

import { MinWidth } from '../../types/common';

export default class Hello extends Command {
  static description = 'Greetings from the Lambda Layer Packager!';

  static examples = [
    `$ packager hello --help
  Familiarize yourself with the available commands of the packager
  `,
  ];

  private summary =
    'A command-line interface (CLI) application designed to compress required libs in the node_modules directory into a .zip file that can be effortlessly deployed on AWS Serverless Lambda functions. This .zip file is compatible with both Terraform and Serverless frameworks, making it simple to deploy';
  private commands = [{ name: 'package', description: 'To pack the node_modules into .zip file' }];

  async run(): Promise<void> {
    this.log(figlet.textSync('Lambda Layer Packager'));
    this.log(`\n${chalk.green(this.summary)}\n`);

    /** Available commands */
    ux.table(this.commands, {
      name: { minWidth: MinWidth.short },
      description: { minWidth: MinWidth.extra_large },
    });
  }
}
