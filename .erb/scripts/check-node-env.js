import chalk from 'chalk';

/**
 * Validates that the current NODE_ENV matches the expected environment value.
 * Displays an error message and exits the process if validation fails.
 * 
 * @param {string} expectedEnv - The expected value for NODE_ENV
 * @throws {Error} Throws an error if expectedEnv parameter is not provided
 * @returns {void}
 */
export default function checkNodeEnv(expectedEnv) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      chalk.whiteBright.bgRed.bold(
        `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`,
      ),
    );
    process.exit(2);
  }
}