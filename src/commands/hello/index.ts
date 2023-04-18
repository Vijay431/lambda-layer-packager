import { Command, ux } from '@oclif/core';
import chalk from 'chalk';
import figlet from 'figlet';

export default class Hello extends Command {
  static description = 'Hello from Lambda Layer Packager!';

  static examples = [
    `$ packager package --help
  To get to know about the package command
  `,
  ];

  async run(): Promise<void> {
    this.log(figlet.textSync('Lambda Layer Packager'));
    this.log(
      `\n${chalk.green(
        'This CLI tool will help you to package the node modules into a zipped file which can be deployed as a Lambda Layer into AWS Serverless Lambda functions'
      )}\n`
    );

    /** Available commands */
    ux.table([{ name: 'package', description: 'To package the application node modules' }], {
      name: { minWidth: 8 },
      description: { minWidth: 20 },
    });
  }
}
