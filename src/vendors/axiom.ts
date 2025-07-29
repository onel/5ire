// @ts-ignore
import { Axiom } from '@axiomhq/js';
import { captureException } from '../main/logging';

let axiom: any = null;

/**
 * Gets or creates a singleton instance of the Axiom client.
 * Initializes the client with environment variables AXIOM_TOKEN and AXIOM_ORG_ID.
 * @returns {any} The Axiom client instance or null if initialization fails
 */
function getAxiom() {
  if (!axiom) {
    try {
      axiom = new Axiom({
        token: process.env.AXIOM_TOKEN as string,
        orgId: process.env.AXIOM_ORG_ID as string,
      });
    } catch (err: any) {
      captureException(err);
    }
  }
  return axiom;
}

/**
 * Axiom service wrapper providing data ingestion and flushing capabilities
 */
export default {
  /**
   * Ingests data into the '5ire' dataset in Axiom.
   * @param {Array<{[key: string]: any}>} data - Array of objects to ingest
   */
  ingest(data: { [key: string]: any }[]) {
    try {
      const axiom = getAxiom();
      axiom && axiom.ingest('5ire', data);
    } catch (err: any) {
      captureException(err);
    }
  },
  /**
   * Flushes any pending data to Axiom.
   * @returns {Promise<void>} Promise that resolves when flush is complete
   */
  async flush() {
    try {
      const axiom = getAxiom();
      axiom && (await axiom.flush());
    } catch (err: any) {
      captureException(err);
    }
  },
};