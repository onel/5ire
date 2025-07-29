import { IServiceProvider } from './types';

/**
 * Ollama service provider configuration object.
 * Defines the settings and capabilities for the Ollama AI service provider.
 */
export default {
  /** The display name of the service provider */
  name: 'Ollama',
  /** The base API URL for the Ollama service */
  apiBase: 'http://localhost:11434',
  /** The currency used for pricing calculations */
  currency: 'USD',
  /** General options for the service provider */
  options: {
    /** Whether the API base URL can be customized by users */
    apiBaseCustomizable: true,
    /** Whether the API key is optional for this provider */
    isApiKeyOptional: true,
    /** The endpoint path for retrieving available models */
    modelsEndpoint: '/api/tags',
  },
  /** Configuration for chat functionality */
  chat: {
    /** The API schema fields required for chat requests */
    apiSchema: ['base', 'key', 'proxy'],
    /** Documentation strings for chat parameters */
    docs: {
      /** Documentation for the temperature parameter */
      temperature:
        'Higher values will make the output more creative and unpredictable, while lower values will make it more precise.',
      /** Documentation for the presence penalty parameter */
      presencePenalty:
        "Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      /** Documentation for the top-p parameter */
      topP: 'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with topP probability mass.',
    },
    /** Placeholder values for input fields */
    placeholders: {
      /** Placeholder text for the base URL field */
      base: 'localhost:11434',
    },
    /** Configuration constraints for the presence penalty parameter */
    presencePenalty: { min: -2, max: 2, default: 0 },
    /** Configuration constraints for the top-p parameter */
    topP: { min: 0, max: 1, default: 1 },
    /** Configuration constraints for the temperature parameter */
    temperature: { min: 0, max: 1, default: 0.9 },

    /** Chat-specific options */
    options: {
      /** Whether users can customize the model selection */
      modelCustomizable: true,
    },
    /** Array of available chat models */
    models: [],
  },
  /** Configuration for embedding functionality */
  embedding: {
    /** The API schema fields required for embedding requests */
    apiSchema: ['base'],
    /** Placeholder values for embedding input fields */
    placeholders: {
      /** Placeholder text for the base URL field */
      base: 'localhost:11434',
    },
    /** Embedding-specific options */
    options: {
      /** Whether users can customize the model selection for embeddings */
      modelCustomizable: true,
    },
    /** Array of available embedding models */
    models: [],
  },
} as IServiceProvider;