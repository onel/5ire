import { ProviderType, IServiceProvider } from './types';
import Azure from './Azure';
import Baidu from './Baidu';
import OpenAI from './OpenAI';
import Google from './Google';
import Moonshot from './Moonshot';
import Anthropic from './Anthropic';
import Fire from './Fire';
import Ollama from './Ollama';
import LMStudio from './LMStudio';
import Doubao from './Doubao';
import Grok from './Grok';
import DeepSeek from './DeepSeek';
import Mistral from './Mistral';
import Perplexity from './Perplexity';
import AI302 from './AI302';

/**
 * Registry of all available AI service providers mapped by their names.
 * Contains implementations for various AI providers including OpenAI, Anthropic, Google, and others.
 * Special cases include '302.AI' and '5ire' which use non-standard naming conventions.
 */
export const providers: { [key: string]: IServiceProvider } = {
  OpenAI,
  Anthropic,
  Azure,
  Google,
  Grok,
  Baidu,
  Mistral,
  Moonshot,
  Ollama,
  Doubao,
  DeepSeek,
  LMStudio,
  Perplexity,
  '302.AI': AI302,
  '5ire': Fire,
};

/**
 * Retrieves a specific AI service provider by its name.
 * 
 * @param providerName - The name of the provider to retrieve
 * @returns The service provider implementation for the specified name
 */
export function getBuiltInProvider(
  providerName: ProviderType,
): IServiceProvider {
  return providers[providerName];
}

/**
 * Retrieves all available AI service providers.
 * 
 * @returns An array containing all registered service provider implementations
 */
export function getBuiltInProviders(): IServiceProvider[] {
  return Object.values(providers);
}

/**
 * Retrieves the chat API schema for a specific provider.
 * Falls back to OpenAI's schema if the specified provider is not found.
 * 
 * @param providerName - The name of the provider whose API schema to retrieve
 * @returns An array of strings representing the API schema for the provider's chat functionality
 */
export function getChatAPISchema(providerName: string): string[] {
  const provider = providers[providerName];
  if (!provider) {
    return OpenAI.chat.apiSchema; // Fallback to OpenAI if provider not found
  }
  return provider.chat.apiSchema;
}