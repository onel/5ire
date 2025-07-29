/**
 * Represents a single usage record for tracking API consumption and costs
 */
export interface IUsage {
  /** Unique identifier for the usage record */
  id: string;
  /** Name of the service provider */
  provider: string;
  /** Model name or identifier used */
  model: string;
  /** Number of input tokens consumed */
  inputTokens: number;
  /** Number of output tokens generated */
  outputTokens: number;
  /** Cost per input token */
  inputPrice: number;
  /** Cost per output token */
  outputPrice: number;
  /** Timestamp when the usage record was created */
  createdAt: number;
}

/**
 * Represents aggregated usage statistics for a specific provider and model combination
 */
export interface IUsageStatistics {
  /** Name of the service provider */
  provider: string;
  /** Model name or identifier */
  model: string;
  /** Total number of input tokens consumed */
  inputTokens: number;
  /** Total number of output tokens generated */
  outputTokens: number;
  /** Total cost for input tokens */
  inputCost: number;
  /** Total cost for output tokens */
  outputCost: number;
}