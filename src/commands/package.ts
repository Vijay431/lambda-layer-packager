import archiver from 'archiver';
import { Command, Option } from 'commander';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import Spinnies from 'spinnies';

import { cli } from '../assets/json';
import { PackageManager } from '../types/common';
import { getCommandByPackageManager, getOnlyProdCommand } from '../utils';

interface PackageCommand {
  /** @description directory where libs be stored in the archive file */
  dir: string;
  /** @description name of the archive file */
  name: string;
  /** @description should only production dependencies be packed */
  onlyProd: boolean;
  /** @description package manager which is being utilized in this project */
  packageManager: PackageManager;
}
export default function package_command(): Command {
  const command = new Command(),
    compressionLevel = 9,
    concurrency = 10;

  const spinner = new Spinnies({
    color: 'gray',
    spinner: { frames: ['📦'], interval: 100 },
  });

  return command
    .command('package')
    .description(cli.package.description)
    .summary(cli.package.summary)
    .addOption(
      new Option('-n, --name [name]', 'output file name with default extension .zip')
        .default('layer')
        .makeOptionMandatory()
    )
    .addOption(
      new Option(
        '-m, --package-manager [package-manager]',
        'What package manager is being utilized in this project?'
      )
        .choices(Object.values(PackageManager))
        .default(PackageManager.npm)
        .makeOptionMandatory()
    )
    .addOption(
      new Option(
        '-d, --dir [directory]',
        'archived file directory where libs will be stored in the archive file'
      )
        .default('nodejs/node_modules')
        .makeOptionMandatory()
    )
    .addOption(
      new Option(
        '--only-prod [prod-dependencies]',
        'Should only production dependencies be packed?'
      )
        .default(true)
        .makeOptionMandatory()
    )
    .allowUnknownOption(false)
    .action((args: PackageCommand) => {
      const { dir, name, onlyProd, packageManager } = args,
        /** Generating command */
        command = [
          getCommandByPackageManager(packageManager),
          onlyProd ? getOnlyProdCommand(packageManager) : '',
        ]
          .join(' ')
          .trim();

      /** Strating to pack node_modules */
      childProcess
        .exec(command)
        .stdout?.on('data', async (chunk) => {
          /** Reading dependencies from the result */
          const deps = [PackageManager.npm, PackageManager.yarn].includes(packageManager)
              ? JSON.parse(chunk).dependencies
              : JSON.parse(chunk)[0].dependencies,
            /** push `@types` always */
            formattedDeps = [...Object.keys(deps), '@types'];

          /** Opening zip module */
          const zipFileName = (name ?? 'layer') + '.zip';
          const output = fs.createWriteStream(zipFileName),
            archive = archiver('zip', {
              statConcurrency: concurrency,
              gzip: true,
              gzipOptions: {
                level: compressionLevel,
              },
            });

          output
            .on('error', (err) => {
              throw err;
            })
            .on('warning', (err) => {
              if (err.code === 'ENOENT') {
                console.warn('Something went wrong!');
              } else {
                throw err;
              }
            })
            .on('close', () => {
              console.log(`${zipFileName} has been created and placed in project default path`);
            });

          archive.pipe(output);

          /** Generate table view of packing modules */
          formattedDeps.forEach((d) => {
            spinner.add(d, { text: `Packing ${d}...` });
            archive.directory(`node_modules/${d}`, `${dir}/${d}`);
            spinner.succeed(d, { text: `Packing ${d} succeeded!` });
          });

          await archive.finalize();
        })
        .on('error', (err: Error) => {
          console.error(err.message);
          throw err;
        });

      spinner.stopAll();
    });
}
