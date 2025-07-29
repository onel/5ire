/**
 * Represents a tool that can be used during chat interactions.
 */
export interface ITool {
  /** Unique identifier for the tool */
  id: string;
  /** Display name of the tool */
  name: string;
  /** Optional arguments to pass to the tool */
  args?: any;
}

/**
 * Contains the result of a chat read operation.
 */
export interface IReadResult {
  /** The main content returned from the read operation */
  content: string;
  /** Optional reasoning or explanation for the result */
  reasoning?: string;
  /** Tool that was used during the operation, if any */
  tool?: ITool | null;
  /** Number of tokens consumed for input processing */
  inputTokens?: number;
  /** Number of tokens generated in the output */
  outputTokens?: number;
}

/**
 * Interface for chat readers that process and return chat content.
 */
export default interface IChatReader {
  /**
   * Reads and processes chat content with callback handlers for different events.
   * @param callbacks - Object containing callback functions for handling different events
   * @param callbacks.onError - Called when an error occurs during reading
   * @param callbacks.onProgress - Called with content chunks as they are processed
   * @param callbacks.onToolCalls - Called when tools are invoked during processing
   * @returns Promise that resolves to the complete read result
   */
  read({
    onError,
    onProgress,
    onToolCalls,
  }: {
    onError: (error: any) => void;
    onProgress: (chunk: string, reasoning?: string) => void;
    onToolCalls: (toolCalls: any) => void;
  }): Promise<IReadResult>;
}