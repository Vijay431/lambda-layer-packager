import archiver from 'archiver';
import chalk from 'chalk';
import childProcess from 'node:child_process';
import fs from 'node:fs';

import { Command, Flags, ux } from '@oclif/core';

import { PackageManager } from '../../types/common';
import { getCommandByPackageManager, getOnlyProdCommand } from '../../utils';

export default class Package extends Command {
  private zipFileName = 'layer.zip';

  static description = 'Pack the node modules into a zipped file, to get easily deployed';

  static examples = [
    `$ packager package
  packages node modules with all default options
  `,
  ];

  static flags = {
    'package-manager': Flags.string({
      default: 'npm',
      description: 'Which package manager being used in this project?',
      exactlyOne: [PackageManager.npm, PackageManager.yarn, PackageManager.pnpm],
      helpLabel: 'package-manager',
      name: 'package_manager',
    }),
    dir: Flags.string({
      default: 'nodejs/node_modules',
      description: 'Path of the packed node modules inside a zipped folder',
      helpLabel: 'dir',
      aliases: ['d'],
      name: 'dir',
    }),
    'only-prod': Flags.boolean({
      default: true,
      description: 'Pack only prod dependencies?',
      helpLabel: 'only-prod',
      name: 'only_prod',
      allowNo: true,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Package),
      packageManager = flags['package-manager'] as PackageManager,
      dir = flags['dir'],
      onlyProd = flags['only-prod'];

    this.log(`Chosen Package Manager: ${chalk.red(packageManager)}`);
    this.log(`Given directory: ${chalk.red(dir)}`);
    this.log(`Production dependencies: ${chalk.red(onlyProd)}`);

    // Generating command
    const command = [getCommandByPackageManager(packageManager), onlyProd ? getOnlyProdCommand(packageManager) : ''].join(' ').trim();
    this.log(`Generated command: ${chalk.green(command)}`);

    // Strating to pack node_modules
    childProcess
      .exec(command)
      .stdout?.on('data', async (chunk) => {
        // Opening zip module
        const output = fs.createWriteStream(this.zipFileName),
          archive = archiver('zip', {
            zlib: { level: 9 },
            statConcurrency: 10,
          });

        // Reading dependencies from the result
        const deps = packageManager === PackageManager.npm ? JSON.parse(chunk).dependencies : JSON.parse(chunk)[0].dependencies;
        const formattedDeps = Object.keys(deps);

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
            const kb: any = (bytes / 1000).toFixed(2);
            const mb: any = (kb / 1000).toFixed(2);
          });

        archive.pipe(output);

        // Generate table view of packing modules
        ux.table(
          formattedDeps.map((d, i) => ({ item: i, module: d })),
          { item: { header: 'Item', minWidth: 8 }, module: { header: 'Module', minWidth: 10 } }
        );

        formattedDeps.forEach((d) => {
          archive.directory(`node_modules/${d}`, `${dir}/${d}`);
        });

        await archive.finalize();
      })
      .on('error', (err: Error) => {
        console.error(err.message);
        throw err;
      });
  }
}
