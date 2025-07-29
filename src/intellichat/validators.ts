import useProviderStore from 'stores/useProviderStore';
import { isNull, isNumber } from 'lodash';
import { isBlank } from 'utils/validators';
import { DEFAULT_MAX_TOKENS } from '../consts';

/**
 * Validates if the provided max tokens value is valid for the specified provider and model.
 * 
 * @param {number | null | undefined} maxTokens - The maximum number of tokens to validate
 * @param {string} providerName - The name of the AI provider
 * @param {string} modelName - The name of the AI model
 * @returns {boolean} True if the max tokens value is valid, false otherwise
 */
export function isValidMaxTokens(
  maxTokens: number | null | undefined,
  providerName: string,
  modelName: string,
): maxTokens is number | null {
  if (isNull(maxTokens)) return true;
  if (!isNumber(maxTokens)) return false;
  if (maxTokens <= 0) return false;

  const model = useProviderStore
    .getState()
    .getAvailableModel(providerName, modelName);
  return maxTokens <= (model.maxTokens || DEFAULT_MAX_TOKENS);
}

/**
 * Validates if the provided temperature value is within the acceptable range for the specified provider.
 * 
 * @param {number | null | undefined} temperature - The temperature value to validate
 * @param {string} providerName - The name of the AI provider
 * @returns {boolean} True if the temperature value is valid, false otherwise
 */
export function isValidTemperature(
  temperature: number | null | undefined,
  providerName: string,
): boolean {
  if (isBlank(providerName)) {
    return false;
  }
  if (!isNumber(temperature)) {
    return false;
  }
  const provider = useProviderStore
    .getState()
    .getAvailableProvider(providerName);
  const { min, max, interval } = provider.temperature;
  if (interval?.leftOpen ? temperature <= min : temperature < min) {
    return false;
  }
  if (interval?.rightOpen ? temperature >= max : temperature > max) {
    return false;
  }
  return true;
}