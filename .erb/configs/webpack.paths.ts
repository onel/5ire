import path from 'path';

/**
 * Root directory of the project (two levels up from this config file)
 */
const rootPath = path.join(__dirname, '../..');

/**
 * Directory containing DLL (Dynamic Link Library) files for webpack optimization
 */
const dllPath = path.join(__dirname, '../dll');

/**
 * Source code directory containing all application source files
 */
const srcPath = path.join(rootPath, 'src');

/**
 * Directory containing the main process source code for Electron
 */
const srcMainPath = path.join(srcPath, 'main');

/**
 * Directory containing the renderer process source code for Electron
 */
const srcRendererPath = path.join(srcPath, 'renderer');

/**
 * Release directory where built application files are placed
 */
const releasePath = path.join(rootPath, 'release');

/**
 * Application directory within the release folder
 */
const appPath = path.join(releasePath, 'app');

/**
 * Path to the package.json file in the application directory
 */
const appPackagePath = path.join(appPath, 'package.json');

/**
 * Node modules directory for the built application
 */
const appNodeModulesPath = path.join(appPath, 'node_modules');

/**
 * Node modules directory in the source folder
 */
const srcNodeModulesPath = path.join(srcPath, 'node_modules');

/**
 * Distribution directory where compiled application code is output
 */
const distPath = path.join(appPath, 'dist');

/**
 * Distribution directory for compiled main process code
 */
const distMainPath = path.join(distPath, 'main');

/**
 * Distribution directory for compiled renderer process code
 */
const distRendererPath = path.join(distPath, 'renderer');

/**
 * Build directory for temporary build artifacts and final packaged application
 */
const buildPath = path.join(releasePath, 'build');

/**
 * Webpack path configuration object containing all project directory paths
 * Used by webpack configuration files to resolve file locations consistently
 */
export default {
  rootPath,
  dllPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distRendererPath,
  buildPath,
};