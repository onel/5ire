/**
 * Script to check for native dependencies in the project and ensure they are properly located.
 * Native dependencies should be installed in ./release/app rather than the root to work with Webpack.
 */

import fs from 'fs';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { dependencies } from '../../package.json';

/**
 * Check if dependencies exist in package.json and validate native dependency placement
 */
if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies);
  
  /**
   * Find native dependencies by scanning node_modules for folders containing binding.gyp files.
   * binding.gyp indicates a native dependency that needs to be compiled.
   */
  const nativeDeps = fs
    .readdirSync('node_modules')
    .filter((folder) => fs.existsSync(`node_modules/${folder}/binding.gyp`));
  
  /**
   * Exit early if no native dependencies are found
   */
  if (nativeDeps.length === 0) {
    process.exit(0);
  }
  
  try {
    /**
     * Use npm ls to determine the dependency tree and find why each native dependency is installed.
     * This helps distinguish between dependencies and devDependencies.
     */
    const { dependencies: dependenciesObject } = JSON.parse(
      execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString(),
    );
    
    const rootDependencies = Object.keys(dependenciesObject);
    
    /**
     * Filter to find native dependencies that are listed as production dependencies
     * rather than devDependencies
     */
    const filteredRootDependencies = rootDependencies.filter((rootDependency) =>
      dependenciesKeys.includes(rootDependency),
    );
    
    /**
     * Display warning message if native dependencies are found in production dependencies.
     * Provides instructions for moving them to the correct location.
     */
    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1;
      console.log(`
 ${chalk.whiteBright.bgYellow.bold(
   'Webpack does not work with native dependencies.',
 )}
${chalk.bold(filteredRootDependencies.join(', '))} ${
        plural ? 'are native dependencies' : 'is a native dependency'
      } and should be installed inside of the "./release/app" folder.
 First, uninstall the packages from "./package.json":
${chalk.whiteBright.bgGreen.bold('npm uninstall your-package')}
 ${chalk.bold(
   'Then, instead of installing the package to the root "./package.json":',
 )}
${chalk.whiteBright.bgRed.bold('npm install your-package')}
 ${chalk.bold('Install the package to "./release/app/package.json"')}
${chalk.whiteBright.bgGreen.bold(
  'cd ./release/app && npm install your-package',
)}
 Read more about native dependencies at:
${chalk.bold(
  'https://electron-react-boilerplate.js.org/docs/adding-dependencies/#module-structure',
)}
 `);
      process.exit(1);
    }
  } catch (e) {
    /**
     * Handle errors that may occur during npm ls execution or JSON parsing
     */
    console.log('Native dependencies could not be checked');
  }
}