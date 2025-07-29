import * as Sentry from '@sentry/electron/main';
import log from 'electron-log';

/**
 * Initializes Sentry error tracking for the application.
 * Only initializes Sentry if SENTRY_DSN environment variable is set and not in development mode.
 */
export function init() {
  if (process.env.SENTRY_DSN && process.env.NODE_ENV !== 'development') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });
  }
}

/**
 * Captures and logs an exception using both electron-log and Sentry.
 * Logs the error locally and sends it to Sentry if configured and not in development mode.
 * 
 * @param {Error | string} error - The error to capture and log
 */
export function captureException(error: Error | string) {
  log.error(error);
  if (process.env.SENTRY_DSN && process.env.NODE_ENV !== 'development') {
    Sentry.captureException(error);
  }
}

/**
 * Captures and logs a warning using both electron-log and Sentry.
 * Logs the warning locally and sends it to Sentry as a warning-level message if configured and not in development mode.
 * 
 * @param {any} warning - The warning message to capture and log
 */
export function captureWarning(warning: any) {
  log.warn(warning);
  if (process.env.SENTRY_DSN && process.env.NODE_ENV !== 'development') {
    Sentry.captureMessage(warning, 'warning');
  }
}

/**
 * Logs debug messages using electron-log.
 * 
 * @param {...any[]} messages - The debug messages to log
 */
export function debug(...messages: any[]) {
  log.debug(messages);
}

/**
 * Logs informational messages using electron-log.
 * 
 * @param {...any[]} messages - The informational messages to log
 */
export function info(...messages: any[]) {
  log.info(...messages);
}

/**
 * Logs warning messages using electron-log.
 * 
 * @param {...any[]} messages - The warning messages to log
 */
export function warn(...messages: any[]) {
  log.warn(...messages);
}

/**
 * Logs error messages using electron-log.
 * 
 * @param {...any[]} messages - The error messages to log
 */
export function error(...messages: any[]) {
  log.error(...messages);
}