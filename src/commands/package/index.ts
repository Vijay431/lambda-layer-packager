import archiver from 'archiver';
import chalk from 'chalk';
import childProcess from 'node:child_process';
import fs from 'node:fs';

import { Command, Flags, ux } from '@oclif/core';

import { MinWidth, PackageManager } from '../../types/common';
import { getCommandByPackageManager, getOnlyProdCommand } from '../../utils';

export default class Package extends Command {
  static description =
    'Zip required libs in the node_modules directory into a .zip file that can be effortlessly deployed with AWS Serverless Lambdas';

  static examples = [
    `$ packager package
  Packages the node_modules directory using all default options
  `,
  ];

  static flags = {
    'package-manager': Flags.string({
      default: 'npm',
      description: 'What package manager is being utilized in this project?',
      exactlyOne: [PackageManager.npm, PackageManager.yarn, PackageManager.pnpm],
      helpLabel: 'package-manager',
      name: 'package_manager',
    }),
    dir: Flags.string({
      default: 'nodejs/node_modules',
      description: 'Location of the compressed node_modules within the zipped folder',
      helpLabel: 'dir',
      char: 'd',
      name: 'dir',
    }),
    'only-prod': Flags.boolean({
      default: true,
      description: 'Should only production dependencies be packed?',
      helpLabel: 'only-prod',
      name: 'only_prod',
      allowNo: true,
    }),
  };

  private zipFileName = 'layer.zip';
  private compressionLevel = 9;
  private concurrency = 10;

  async run(): Promise<void> {
    const { flags } = await this.parse(Package),
      packageManager = flags['package-manager'] as PackageManager,
      dir = flags['dir'],
      onlyProd = flags['only-prod'];

    this.log(`Package manager: ${chalk.green(packageManager)}`);
    this.log(`Directory: ${chalk.green(dir)}`);
    this.log(`Only Production dependencies: ${chalk.green(onlyProd)}`);

    if (packageManager === PackageManager.yarn) {
      throw new Error('Not yet implemented');
    }

    /** Generating command */
    const command = [getCommandByPackageManager(packageManager), onlyProd ? getOnlyProdCommand(packageManager) : ''].join(' ').trim();
    this.log(`Command: ${chalk.green(command)}`);

    /** Strating to pack node_modules */
    childProcess
      .exec(command)
      .stdout?.on('data', async (chunk) => {
        /** Opening zip module */
        const output = fs.createWriteStream(this.zipFileName),
          archive = archiver('zip', {
            statConcurrency: this.concurrency,
            gzip: true,
            gzipOptions: {
              level: this.compressionLevel,
            },
          });

        /** Reading dependencies from the result */
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

        /** Generate table view of packing modules */
        ux.table(
          formattedDeps.map((d, i) => ({ item: i, module: d })),
          { item: { header: 'Item', minWidth: MinWidth.short }, module: { header: 'Module', minWidth: MinWidth.large } }
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
