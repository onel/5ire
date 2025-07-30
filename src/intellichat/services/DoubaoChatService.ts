import { IChatContext, IChatRequestMessage } from 'intellichat/types';
import { urlJoin } from 'utils/util';
import OpenAIChatService from './OpenAIChatService';
import Doubao from '../../providers/Doubao';
import INextChatService from './INextCharService';

/**
 * Chat service implementation for the Doubao provider.
 * Extends OpenAIChatService to provide Doubao-specific functionality while maintaining
 * compatibility with the OpenAI chat interface.
 */
export default class DoubaoChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new DoubaoChatService instance.
   * @param name - The name identifier for this chat service
   * @param chatContext - The chat context containing configuration and state
   */
  constructor(name: string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = Doubao;
  }

  /**
   * Makes an HTTP request to the Doubao chat completions endpoint.
   * Configures the request with Doubao-specific parameters including model ID,
   * streaming settings, and authentication headers.
   * @param messages - Array of chat messages to send in the request
   * @param msgId - Optional message identifier for tracking purposes
   * @returns Promise that resolves to the HTTP response from the Doubao API
   */
  protected async makeRequest(
    messages: IChatRequestMessage[],
    msgId?: string,
  ): Promise<Response> {
    const provider = this.context.getProvider();
    const model = this.context.getModel();
    const modelId = model.extras?.modelId || model.name;
    const payload = await this.makePayload(messages, msgId);
    payload.model = modelId;
    payload.stream = true;
    const url = urlJoin('/chat/completions', provider.apiBase.trim());
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey.trim()}`,
    };
    const isStream = this.context.isStream();
    return this.makeHttpRequest(url, headers, payload, isStream);
  }
}