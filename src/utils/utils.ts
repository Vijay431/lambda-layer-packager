import { PackageManager } from '../types/common';

/**
 * @description To get the corresponding command with respect to the package manager
 */
export function getCommandByPackageManager(
	packageManager: PackageManager,
): string {
	if (packageManager === PackageManager.pnpm) {
		return 'pnpm ls --json';
	}

	return 'npm ls --json';
}

/**
 * @description To get the corresponding `only-prod` command with respect to the package manager
 */
export function getOnlyProdCommand(packageManager: PackageManager) {
	if ([PackageManager.pnpm, PackageManager.yarn].includes(packageManager)) {
		return '--prod';
	}

	return '--omit=dev';
}
