/**
 * Supported AI service provider types
 */
export type ProviderType =
  | 'OpenAI'
  | 'Google'
  | 'Azure'
  | 'Baidu'
  | 'Anthropic'
  | 'Moonshot'
  | 'Mistral'
  | 'DeepSeek'
  | 'Ollama'
  | 'LMStudio'
  | 'ChatBro'
  | '5ire'
  | 'Doubao'
  | 'Grok'
  | '302.AI'
  | 'Perplexity';

/**
 * Defines a numeric range with minimum, maximum, and default values
 */
export interface INumberRange {
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
  /** Default value, null if no default is set */
  default: number | null;
  /** Optional interval configuration for open/closed bounds */
  interval?: {
    /** Whether the left bound is open (exclusive) */
    leftOpen: boolean;
    /** Whether the right bound is open (exclusive) */
    rightOpen: boolean;
  };
}

/**
 * Configuration for version-specific capabilities like vision support
 */
export interface IVersionCapability {
  /** Whether this capability is enabled */
  enabled: boolean;
  /** Whether URL inputs are allowed */
  allowUrl?: boolean;
  /** Whether base64 encoded inputs are allowed */
  allowBase64?: boolean;
  /** List of supported MIME types */
  allowedMimeTypes?: string[];
}

/**
 * Represents a chat model with its properties and capabilities
 */
export interface IChatModel {
  /** Unique identifier for the model */
  id: string;
  /** Display label for the model */
  label?: string;
  /** Model name */
  name: string;
  /** Optional description of the model */
  description?: string | null;
  /** Maximum number of tokens the model can handle */
  maxTokens?: number | null;
  /** Default maximum tokens if not specified */
  defaultMaxTokens?: number | null;
  /** Size of the model's context window */
  contextWindow: number | null;
  /** Whether this is the default model */
  isDefault?: boolean;
  /** Price per input token */
  inputPrice: number;
  /** Price per output token */
  outputPrice: number;
  /** Whether streaming is not supported */
  noStreaming?: boolean;
  /** Additional model-specific properties */
  extras?: { [key: string]: string };
  /** Model capabilities configuration */
  capabilities?: {
    /** JSON output capability */
    json?: { enabled: boolean };
    /** Function/tool calling capability */
    tools?: { enabled: boolean };
    /** Vision/image processing capability */
    vision?: IVersionCapability;
  };
}

/**
 * Configuration for chat functionality of a provider
 */
export interface IChatConfig {
  /** API schema definitions */
  apiSchema: string[];
  /** Additional model-specific configuration keys */
  modelExtras?: string[];
  /**
   *  Positive values penalize new tokens based on whether they appear
   *  in the text so far, increasing the model's likelihood to talk about new topics.
   */
  presencePenalty: INumberRange;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability mass.
   */
  topP: INumberRange;
  /**
   * What sampling temperature to use,
   * Higher values will make the output more random,
   * while lower values make it more focused and deterministic.
   */
  temperature: INumberRange;
  /** Available chat models */
  models: IChatModel[];
  /** Documentation links or references */
  docs?: { [key: string]: string };
  /** UI placeholder text configurations */
  placeholders?: { [key: string]: string };
  /** Provider-specific options */
  options: {
    /** Whether model selection can be customized */
    modelCustomizable?: boolean;
    /** Whether streaming can be toggled */
    streamCustomizable?: boolean;
  };
}

/**
 * Represents an embedding model with its properties
 */
export interface IEmbeddingModel {
  /** Model name */
  name?: string;
  /** Display label for the model */
  label?: string;
  /** Price per usage unit */
  price: number;
  /** Dimension of the embedding vectors */
  dimension?: number;
  /** Model description */
  description?: string;
  /** Maximum number of tokens supported */
  maxTokens?: number;
  /** Maximum number of characters supported */
  maxChars?: number;
  /** Whether this is the default embedding model */
  isDefault?: boolean;
}

/**
 * Configuration for embedding functionality of a provider
 */
export interface IEmbeddingConfig {
  /** API schema definitions */
  apiSchema: string[];
  /** Documentation links or references */
  docs?: { [key: string]: string };
  /** UI placeholder text configurations */
  placeholders?: { [key: string]: string };
  /** Available embedding models */
  models: IEmbeddingModel[];
  /** Provider-specific options */
  options?: {
    /** Whether model selection can be customized */
    modelCustomizable?: boolean;
  };
}

/**
 * Complete service provider configuration
 */
export interface IServiceProvider {
  /** Provider name/type */
  name: ProviderType;
  /** Provider description */
  description?: string;
  /** Referral or affiliate information */
  referral?: string;
  /** Whether the provider is disabled */
  disabled?: boolean;
  /** Whether this is a premium provider */
  isPremium?: boolean;
  /** Whether this is a built-in provider */
  isBuiltIn?: boolean;
  /** Base API URL */
  apiBase: string;
  /** API key for authentication */
  apiKey?: string;
  /** API version identifier */
  apiVersion?: string;
  /** Currency used for pricing */
  currency: 'USD' | 'CNY';
  /** Provider configuration options */
  options: {
    /** Whether API base URL can be customized */
    apiBaseCustomizable?: boolean;
    /** Whether API key can be customized */
    apiKeyCustomizable?: boolean;
    /** Endpoint for fetching available models */
    modelsEndpoint?: string;
    /** Whether API key is optional */
    isApiKeyOptional?: boolean;
  };
  /** Chat functionality configuration */
  chat: IChatConfig;
  /** Optional embedding functionality configuration */
  embedding?: IEmbeddingConfig;
}

/**
 * Runtime configuration for a chat model instance
 */
export interface IChatModelConfig {
  /** Unique model identifier */
  id: string;
  /** Model name */
  name: string;
  /** Display label */
  label?: string;
  /** Model description */
  description?: string | null;
  /** Maximum tokens supported */
  maxTokens?: number | null;
  /** Default maximum tokens */
  defaultMaxTokens?: number | null;
  /** Context window size */
  contextWindow: number | null;
  /** Whether streaming is disabled */
  noStreaming?: boolean;
  /** Whether this is the default model */
  isDefault?: boolean;
  /** Whether this is a built-in model */
  isBuiltIn?: boolean;
  /** Whether this is a premium model */
  isPremium?: boolean;
  /** Whether the model is ready for use */
  isReady: boolean;
  /** Whether the model was loaded from API */
  isFromApi?: boolean;
  /** Input token price */
  inputPrice: number;
  /** Output token price */
  outputPrice: number;
  /** Model capabilities */
  capabilities: {
    /** JSON output support */
    json?: { enabled: boolean };
    /** Function/tool calling support */
    tools?: { enabled: boolean };
    /** Vision/image processing support */
    vision?: IVersionCapability;
  };
  /** Whether the model is disabled */
  disabled?: boolean;
  /** Additional model properties */
  extras?: {
    [key: string]: string;
  };
}

/**
 * Runtime configuration for a chat provider instance
 */
export interface IChatProviderConfig {
  /** Provider name */
  name: string;
  /** Referral information */
  referral?: string;
  /** API schema definitions */
  schema: string[];
  /** Provider description */
  description?: string;
  /** Temperature parameter range */
  temperature: INumberRange;
  /** Top-p parameter range */
  topP: INumberRange;
  /** Presence penalty parameter range */
  presencePenalty: INumberRange;
  /** Whether the provider is disabled */
  disabled: boolean;
  /** Whether this is a built-in provider */
  isBuiltIn: boolean;
  /** Whether this is the default provider */
  isDefault: boolean;
  /** Whether this is a premium provider */
  isPremium: boolean;
  /** Whether the provider is ready for use */
  isReady: boolean;
  /** API base URL */
  apiBase: string;
  /** API key */
  apiKey: string;
  /** Optional API secret */
  apiSecret?: string;
  /** API version */
  apiVersion?: string;
  /** Pricing currency */
  currency: 'USD' | 'CNY';
  /** Additional model configuration keys */
  modelExtras?: string[];
  /** Endpoint for fetching models */
  modelsEndpoint?: string;
  /** Available models */
  models: IChatModelConfig[];
  /** Proxy configuration */
  proxy?: string;
}