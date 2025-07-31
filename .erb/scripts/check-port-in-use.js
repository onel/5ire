/**
 * Port availability checker script
 * Checks if a specified port is available on localhost and exits with error if occupied
 */

import chalk from 'chalk';
import detectPort from 'detect-port';

/** @type {string} The port to check, from environment variable or default to '1212' */
const port = process.env.PORT || '1212';

/**
 * Check if the specified port is available on localhost
 * @param {string} port - The port number to check
 * @param {function} callback - Callback function with error and available port parameters
 */
detectPort(port, (err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`,
      ),
    );
  } else {
    process.exit(0);
  }
});