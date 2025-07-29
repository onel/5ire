import { createClient } from '@supabase/supabase-js';
import { captureException } from '../renderer/logging';

/**
 * Supabase client instance configured with project URL and API key from environment variables
 */
const supabase = createClient(
  `https://${window.envVars.SUPA_PROJECT_ID}.supabase.co`,
  window.envVars.SUPA_KEY as string,
);

/**
 * Fetches a single record from a Supabase table by its ID
 * @template Type - The expected return type of the fetched record
 * @param {string} table - The name of the table to query
 * @param {number} id - The ID of the record to fetch
 * @param {string} [columns='*'] - Comma-separated list of columns to select, defaults to all columns
 * @returns {Promise<Type>} Promise that resolves to the fetched record cast to the specified type
 * @throws {Error} Throws the original Supabase error if the query fails
 */
export async function fetchById<Type>(
  table: string,
  id: number,
  columns: string = '*',
): Promise<Type> {
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('id', id)
    .maybeSingle();
  if (error) {
    captureException(new Error(error.message));
    throw error;
  }
  return data as Type;
}

export default supabase;