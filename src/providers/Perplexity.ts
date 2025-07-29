import { IServiceProvider } from './types';

/**
 * Array of available chat models for the Perplexity service provider.
 * Each model contains configuration details including pricing, capabilities, and limits.
 */
const chatModels = [
  {
    id: 'sonar-deep-research',
    name: 'sonar-deep-research',
    label: 'sonar-deep-research',
    contextWindow: 128000,
    maxTokens: 8000,
    defaultMaxTokens: 8000,
    inputPrice: 0.002,
    outputPrice: 0.008,
    capabilities: {
      tools: null,
    },
    description:
      'Sonar Deep Research gathers information step by step to provide clear, detailed insights.',
  },
  {
    id: 'sonar-pro',
    name: 'sonar-pro',
    label: 'sonar-pro',
    contextWindow: 200000,
    maxTokens: 8000, // sonar-pro has a max output token limit of 8k. https://docs.perplexity.ai/models/models/sonar-pro#cost-breakdown-for-sample-request
    defaultMaxTokens: 8000,
    inputPrice: 0.003,
    outputPrice: 0.015,
    capabilities: {
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description:
      'Sonar Pro offers large-context streaming to handle diverse tasks with ease.',
  },
  {
    id: 'sonar',
    name: 'sonar',
    label: 'sonar',
    contextWindow: 128000,
    maxTokens: 8000,
    defaultMaxTokens: 8000,
    inputPrice: 0.001,
    outputPrice: 0.001,

    capabilities: {
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description:
      'Sonar quickly finds and summarizes key information in a lightweight, cost-effective way.',
  },
  {
    id: 'sonar-reasoning-pro',
    name: 'sonar-reasoning-pro',
    label: 'sonar-reasoning-pro',
    contextWindow: 128000,
    maxTokens: 8000,
    defaultMaxTokens: 8000,
    inputPrice: 0.002,
    outputPrice: 0.008,
    capabilities: {
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description:
      'Sonar Reasoning Pro uses tools and image understanding to deliver smart answers and practical suggestions.',
  },
  {
    id: 'sonar-reasoning',
    name: 'sonar-reasoning',
    label: 'sonar-reasoning',
    contextWindow: 128000,
    maxTokens: 8000,
    defaultMaxTokens: 8000,
    inputPrice: 0.001,
    outputPrice: 0.005,
    capabilities: {
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description:
      'Sonar Reasoning leverages vision and API access to reason through context and solve problems simply.',
  },
  {
    id: 'r1-1776',
    name: 'r1-1776',
    label: 'r1-1776',
    contextWindow: 128000,
    maxTokens: 8000,
    defaultMaxTokens: 8000,
    inputPrice: 0.002,
    outputPrice: 0.008,
    capabilities: {
      tools: null,
    },
    description:
      'r1-1776 offers high-throughput, cost-effective streaming for reliable and responsive text generation.',
  },
];

/**
 * Perplexity service provider configuration object.
 * Defines the API settings, supported features, and available chat models for the Perplexity AI service.
 * 
 * @property {string} name - The display name of the service provider
 * @property {string} apiBase - The base URL for the Perplexity API
 * @property {string} currency - The currency used for pricing (USD)
 * @property {Object} options - Global configuration options for the provider
 * @property {boolean} options.apiBaseCustomizable - Whether the API base URL can be customized
 * @property {boolean} options.apiKeyCustomizable - Whether the API key can be customized
 * @property {Object} chat - Chat-specific configuration and settings
 * @property {string[]} chat.apiSchema - Required API configuration fields
 * @property {Object} chat.presencePenalty - Presence penalty parameter constraints
 * @property {Object} chat.topP - Top-p parameter constraints for nucleus sampling
 * @property {Object} chat.temperature - Temperature parameter constraints for response randomness
 * @property {Object} chat.options - Chat-specific options
 * @property {boolean} chat.options.modelCustomizable - Whether the model can be customized
 * @property {Array} chat.models - Array of available chat models with their configurations
 */
export default {
  name: 'Perplexity',
  apiBase: 'https://api.perplexity.ai',
  currency: 'USD',
  options: {
    apiBaseCustomizable: true,
    apiKeyCustomizable: true,
  },
  chat: {
    apiSchema: ['base', 'key', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: 0.9 },
    temperature: { min: 0, max: 2, default: 0.2 },
    options: {
      modelCustomizable: true,
    },
    models: chatModels,
  },
} as IServiceProvider;