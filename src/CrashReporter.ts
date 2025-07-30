import { app, crashReporter } from 'electron';
import { debug } from './main/logging';

/**
 * Initializes the Electron crash reporter with Sentry integration.
 * Configures crash reporting to send minidumps to Sentry with app metadata.
 * Sets up the crash reporter with the application name, disables system crash handler,
 * configures Sentry submission URL, and adds version information as extra parameter.
 */
export default function initCrashReporter() {
  crashReporter.start({
    productName: app.getName(),
    ignoreSystemCrashHandler: true,
    submitURL: `${process.env.SENTRY_DSN}/minidump/?sentry_key=${process.env.SENTRY_KEY}`,
  });
  crashReporter.addExtraParameter('version', app.getVersion());
  debug('CrashReporter initialized');
}