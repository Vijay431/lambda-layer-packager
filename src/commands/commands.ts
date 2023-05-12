import { Command } from 'commander';

const example = `
To show available commands:
  $ packager commands --help
  Familiarize yourself with the available commands of the packager
`;
/**
 * @description hello command to show the available commmands
 *
 * @returns {Command} Generated command
 */
export default function hello_command(): Command {
  const command = new Command();

  return command
    .command('commands')
    .description('Show available commands')
    .option('--s, --show', 'show available commands', true)
    .action((opts) => {
      if (opts.show) {
        console.log(`
  Available commands:
    $ packager package - To pack node_modules 
  `);
      }
    })
    .addHelpText('after', example);
}
