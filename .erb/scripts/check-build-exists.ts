/**
 * Check if the renderer and main bundles are built
 * 
 * This script validates that both the main process and renderer process
 * JavaScript bundles exist in their expected locations before allowing
 * the application to proceed. If either bundle is missing, it throws
 * an error with instructions on how to build the missing bundle.
 */
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

/** Path to the main process JavaScript bundle */
const mainPath = path.join(webpackPaths.distMainPath, 'main.js');

/** Path to the renderer process JavaScript bundle */
const rendererPath = path.join(webpackPaths.distRendererPath, 'renderer.js');

// Validate main process bundle exists
if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build:main"',
    ),
  );
}

// Validate renderer process bundle exists
if (!fs.existsSync(rendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "npm run build:renderer"',
    ),
  );
}