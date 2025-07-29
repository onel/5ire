import { IChatContext, IChatRequestMessage } from 'intellichat/types';
import { IServiceProvider } from 'providers/types';

/**
 * Interface defining the contract for a chat service that handles message processing and streaming responses.
 */
export default interface INextChatService {
  /**
   * The unique identifier name for this chat service instance.
   */
  name: string;
  
  /**
   * The chat context containing conversation state and configuration.
   */
  context: IChatContext;
  
  /**
   * The service provider used for handling chat operations.
   */
  provider: IServiceProvider;
  
  /**
   * Initiates a chat conversation with the provided messages.
   * @param message - Array of chat request messages to process
   * @param msgId - Optional message identifier for tracking purposes
   */
  chat(message: IChatRequestMessage[], msgId?: string): void;
  
  /**
   * Aborts the current chat operation if one is in progress.
   */
  abort(): void;
  
  /**
   * Registers a callback function to be executed when the chat operation completes.
   * @param callback - Function that receives the final result and returns a Promise
   */
  onComplete(callback: (result: any) => Promise<void>): void;
  
  /**
   * Registers a callback function to be executed when tool calls are made during the chat.
   * @param callback - Function that receives the name of the tool being called
   */
  onToolCalls(callback: (toolName: string) => void): void;
  
  /**
   * Registers a callback function to be executed when streaming data is being read.
   * @param callback - Function that receives the chunk of data and optional reasoning
   */
  onReading(callback: (chunk: string, reasoning?: string) => void): void;
  
  /**
   * Registers a callback function to be executed when an error occurs.
   * @param callback - Function that receives the error object and abortion status
   */
  onError(callback: (error: any, aborted: boolean) => void): void;
}