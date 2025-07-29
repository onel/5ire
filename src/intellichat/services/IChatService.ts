import { IChatContext, IChatResponseMessage } from 'intellichat/types';
import { IServiceProvider } from 'providers/types';

/**
 * Interface defining the contract for a chat service that handles communication with AI providers.
 */
export default interface IChatService {
  /**
   * The chat context containing conversation history and settings.
   */
  context: IChatContext;
  
  /**
   * The service provider implementation used for handling API requests.
   */
  provider: IServiceProvider;
  
  /**
   * API configuration settings for connecting to the chat service.
   */
  apiSettings: {
    /** Base URL for the API endpoint */
    base: string;
    /** API key for authentication */
    key: string;
    /** Model identifier to use for chat completion */
    model: string;
    /** Secret key for Baidu provider authentication */
    secret?: string; // baidu
    /** Deployment ID for Azure OpenAI service */
    deploymentId?: string; // azure
  };

  /**
   * Initiates a chat conversation with the configured AI provider.
   * @param params - Chat parameters
   * @param params.message - The message to send to the AI
   * @param params.onMessage - Callback function called when receiving streaming message chunks
   * @param params.onComplete - Callback function called when the chat response is complete
   * @param params.onError - Callback function called when an error occurs or the request is aborted
   */
  chat({
    message,
    onMessage,
    onComplete,
    onError,
  }: {
    message: string;
    onMessage: (message: string) => void;
    onComplete: (result: IChatResponseMessage) => void;
    onError: (error: any, aborted: boolean) => void;
  }): void;
  
  /**
   * Aborts the current chat request if one is in progress.
   */
  abort(): void;
  
  /**
   * Checks if the chat service is ready to handle requests.
   * @returns True if the service is ready, false otherwise
   */
  isReady(): boolean;
}