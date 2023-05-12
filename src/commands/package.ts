import archiver from 'archiver';
import { Command, Option } from 'commander';
import childProcess from 'node:child_process';
import fs from 'node:fs';

import cli from '../../assets/json/cli.json';
import { PackageManager } from '../types/common';
import { getCommandByPackageManager, getOnlyProdCommand } from '../utils';

interface PackageCommand {
  packageManager: PackageManager;
  dir: string;
  onlyProd: boolean;
}

/**
 * @description To pack the node_modules
 *
 * @returns {Command}
 */
export default function package_command(): Command {
  const command = new Command(),
    zipFileName = 'layer.zip',
    compressionLevel = 9,
    concurrency = 10;

  return command
    .command('package')
    .description(cli.package.description)
    .summary(cli.package.summary)
    .addOption(
      new Option('--package-manager', 'What package manager is being utilized in this project?')
        .choices([PackageManager.npm])
        .default(PackageManager.npm, 'default package manager')
        .makeOptionMandatory(true)
    )
    .addOption(
      new Option('-d, --dir', 'Location of the compressed node_modules within the zipped folder')
        .default('nodejs/node_modules', 'default node_modules directory')
        .makeOptionMandatory(true)
    )
    .addOption(
      new Option('--only-prod', 'Should only production dependencies be packed?')
        .default(true)
        .makeOptionMandatory(true)
    )
    .option('-e, --examples', 'show exmaples of command usage')
    .action((args: PackageCommand) => {
      const { dir, onlyProd, packageManager } = args,
        /** Generating command */
        command = [getCommandByPackageManager(packageManager), onlyProd ? getOnlyProdCommand(packageManager) : '']
          .join(' ')
          .trim();

      /** Strating to pack node_modules */
      childProcess
        .exec(command)
        .stdout?.on('data', async (chunk) => {
          /** Opening zip module */
          const output = fs.createWriteStream(zipFileName),
            archive = archiver('zip', {
              statConcurrency: concurrency,
              gzip: true,
              gzipOptions: {
                level: compressionLevel,
              },
            }),
            /** Reading dependencies from the result */
            deps =
              packageManager === PackageManager.npm
                ? JSON.parse(chunk).dependencies
                : JSON.parse(chunk)[0].dependencies,
            formattedDeps = Object.keys(deps);

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
              const bytes = archive.pointer();
              const kb = <any>(bytes / 1000).toFixed(2);
              const mb = <any>(kb / 1000).toFixed(2);
            });

          archive.pipe(output);

          /** Generate table view of packing modules */
          formattedDeps.forEach((d) => {
            archive.directory(`node_modules/${d}`, `${dir}/${d}`);
          });

          await archive.finalize();
        })
        .on('error', (err: Error) => {
          console.error(err.message);
          throw err;
        });
    });
}
