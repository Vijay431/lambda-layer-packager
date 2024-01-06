import { Command } from 'commander';

const example = `
To show available commands:
  $ packager commands --help
  Familiarize yourself with the available commands of the packager
`;
export default function hello_command(): Command {
  const command = new Command();

  return command
    .command('commands')
    .description('Show available commands')
    .action(() => {
        console.log(`
        Available commands:
          $ packager package - To pack node_modules 
        `);
    })
    .addHelpText('after', example);
}
