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
  list?: boolean;

  [x: string]: any;
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
      new Option('--package-manager [package-manager]', 'What package manager is being utilized in this project?')
        .choices([PackageManager.npm, PackageManager.yarn])
        .default(PackageManager.npm, 'default package manager')
        .makeOptionMandatory()
    )
    .addOption(
      new Option('-d, --dir [directory]', 'Location of the compressed node_modules within the zipped folder')
        .default('nodejs/node_modules', 'default node_modules directory')
        .makeOptionMandatory()
    )
    .addOption(
      new Option('--only-prod [prod-dependencies]', 'Should only production dependencies be packed?')
        .default(true)
        .makeOptionMandatory()
    )
    .addOption(
      new Option('-l, --list', 'list all dependencies which will be packed').default(false).makeOptionMandatory(false)
    )
    .allowUnknownOption(false)
    .action((args: PackageCommand) => {
      const { dir, onlyProd, packageManager, list } = args,
        /** Generating command */
        command = [getCommandByPackageManager(packageManager), onlyProd ? getOnlyProdCommand(packageManager) : '']
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

          if (list) {
            console.log('Dependencies which will be packed:');
            formattedDeps.forEach((d) => {
              console.log(d);
            });
            return;
          }

          /** Opening zip module */
          const output = fs.createWriteStream(zipFileName),
            archive = archiver('zip', {
              statConcurrency: concurrency,
              gzip: true,
              gzipOptions: {
                level: compressionLevel
              }
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
