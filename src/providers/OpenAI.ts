import { IServiceProvider } from './types';

/**
 * Array of available OpenAI chat models with their configurations and capabilities.
 * Each model object contains pricing, context window limits, token limits, and supported features.
 */
const chatModels = [
  {
    id: 'o1',
    name: 'o1',
    contextWindow: 200000,
    maxTokens: 100000,
    inputPrice: 0.015,
    outputPrice: 0.05,
    capabilities: {
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `The o1 reasoning model is designed to solve hard problems across domains`,
  },
  {
    id: 'o1-pro',
    name: 'o1-pro',
    label: 'o1-pro',
    contextWindow: 200000,
    maxTokens: 100000,
    defaultMaxTokens: 10000,
    inputPrice: 0.15,
    outputPrice: 0.6,
    noStreaming: true,
    capabilities: {
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `The o1 reasoning model is designed to solve hard problems across domains`,
  },
  {
    id: 'o1-mini',
    name: 'o1-mini-2024-09-12',
    label: 'o1-mini',
    contextWindow: 128000,
    maxTokens: 65536,
    defaultMaxTokens: 60000,
    inputPrice: 0.0011,
    outputPrice: 0.004,
    capabilities: {
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `o1-mini is a faster and more affordable reasoning model`,
  },
  {
    id: 'o3',
    name: 'o3',
    label: 'o3',
    contextWindow: 200000,
    maxTokens: 100000,
    defaultMaxTokens: 100000,
    inputPrice: 0.01,
    outputPrice: 0.04,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
    isDefault: false,
    description: `o3 is a well-rounded and powerful model across domains. It sets a new standard for math, science, coding, and visual reasoning tasks. It also excels at technical writing and instruction-following. Use it to think through multi-step problems that involve analysis across text, code, and images.`,
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    label: 'o3-mini',
    contextWindow: 200000,
    maxTokens: 100000,
    defaultMaxTokens: 100000,
    inputPrice: 0.0011,
    outputPrice: 0.004,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
    isDefault: false,
    description: `o3-mini is OpenAI's most recent small reasoning model, providing high intelligence at the same cost and latency targets of o1-min`,
  },
  {
    id: 'o4-mini',
    name: 'o4-mini',
    label: 'o4-mini',
    contextWindow: 200000,
    maxTokens: 100000,
    defaultMaxTokens: 100000,
    inputPrice: 0.0011,
    outputPrice: 0.0044,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
    isDefault: false,
    description: `o4-mini is OpenAI's latest small o-series model. It's optimized for fast, effective reasoning with exceptionally efficient performance in coding and visual tasks.`,
  },
  {
    id: 'gpt-4.1',
    name: 'gpt-4.1',
    label: 'gpt-4.1',
    contextWindow: 1047576,
    maxTokens: 32768,
    defaultMaxTokens: 4000,
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
    isDefault: true,
    description: `GPT-4.1 is OpenAI's flagship model for complex tasks. It is well suited for problem solving across domains.`,
  },
  {
    id: 'gpt-4.1-nano',
    name: 'gpt-4.1-nano',
    label: 'gpt-4.1-nano',
    contextWindow: 1047576,
    maxTokens: 32768,
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
    isDefault: true,
    description: `GPT-4.1 nano is the fastest, most cost-effective GPT-4.1 model.`,
  },
  {
    id: 'gpt-4.1-mini',
    name: 'gpt-4.1-mini',
    label: 'gpt-4.1-mini',
    contextWindow: 1047576,
    maxTokens: 32768,
    defaultMaxTokens: 8000,
    inputPrice: 0.0004,
    outputPrice: 0.0016,
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
    isDefault: true,
    description: `GPT-4.1 mini provides a balance between intelligence, speed, and cost that makes it an attractive model for many use cases.`,
  },
  {
    id: 'gpt-4o',
    name: 'gpt-4o',
    label: 'gpt-4o',
    contextWindow: 128000,
    maxTokens: 16384,
    defaultMaxTokens: 8000,
    inputPrice: 0.0025,
    outputPrice: 0.01,
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
    isDefault: true,
    description: `GPT-4o ("o" for "omni") is OpenAI's versatile, high-intelligence flagship model. It accepts both text and image inputs, and produces text outputs (including Structured Outputs). It is the best model for most tasks, and is OpenAI's most capable model outside of it's o-series models.`,
  },
  {
    id: 'gpt-4o-mini',
    name: 'gpt-4o-mini',
    label: 'gpt-4o-mini',
    contextWindow: 128000,
    maxTokens: 100000,
    defaultMaxTokens: 10000,
    inputPrice: 0.0011,
    outputPrice: 0.0044,
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
    description: `o4-mini is OpenAI's latest small o-series model. It's optimized for fast, effective reasoning with exceptionally efficient performance in coding and visual tasks.`,
  },
  {
    id: 'gpt-4-turbo',
    name: 'gpt-4-turbo',
    label: 'gpt-4-turbo',
    contextWindow: 128000,
    maxTokens: 4096,
    defaultMaxTokens: 4000,
    inputPrice: 0.01,
    outputPrice: 0.03,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `An older high-intelligence GPT model`,
  },
  {
    id: 'gpt-4',
    name: 'gpt-4',
    contextWindow: 8129,
    maxTokens: 8129,
    defaultMaxTokens: 8000,
    inputPrice: 0.03,
    outputPrice: 0.06,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
    description: `An older high-intelligence GPT model`,
  },
];

/**
 * OpenAI service provider configuration object that implements the IServiceProvider interface.
 * Contains provider metadata, API configuration, and chat model definitions with their capabilities and pricing.
 * 
 * @property {string} name - The display name of the service provider
 * @property {string} apiBase - The base URL for the OpenAI API
 * @property {string} currency - The currency used for pricing (USD)
 * @property {object} options - Configuration options for API customization
 * @property {object} chat - Chat-specific configuration including models, parameters, and API schema
 */
export default {
  name: 'OpenAI',
  apiBase: 'https://api.openai.com/v1',
  currency: 'USD',
  options: {
    apiBaseCustomizable: true,
    apiKeyCustomizable: true,
  },
  chat: {
    apiSchema: ['base', 'key', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: 1 },
    temperature: { min: 0, max: 2, default: 1 },
    options: {
      modelCustomizable: true,
    },
    models: chatModels,
  },
} as IServiceProvider;