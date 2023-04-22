import { PackageManager } from '../types/common';

/**
 * @description To get the corresponding command with respect to the package manager
 *
 * @argument {PackageManager} [packageManager]
 */
export function getCommandByPackageManager(packageManager: PackageManager): string {
  if (packageManager === PackageManager.pnpm) {
    return 'pnpm ls --json';
  } else if (packageManager === PackageManager.yarn) {
    return 'yarn list';
  } else {
    return 'npm ls --json';
  }
}

/**
 * @description To get the corresponding `only-prod` command with respect to the package manager
 *
 * @argument {PackageManager} [packageManager]
 */
export function getOnlyProdCommand(packageManager: PackageManager) {
  if (packageManager === PackageManager.pnpm) {
    return '--prod';
  } else if (packageManager === PackageManager.yarn) {
    return '--production';
  } else {
    return '--omit=dev';
  }
}
