import { IChatContext, IChatRequestMessage } from 'intellichat/types';
import { urlJoin } from 'utils/util';
import OpenAIChatService from './OpenAIChatService';
import DeepSeek from '../../providers/DeepSeek';
import INextChatService from './INextCharService';

/**
 * Chat service implementation for DeepSeek provider.
 * Extends OpenAIChatService to provide DeepSeek-specific chat functionality
 * while maintaining compatibility with the OpenAI chat interface.
 */
export default class DeepSeekChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new DeepSeekChatService instance.
   * @param {string} name - The name identifier for this chat service
   * @param {IChatContext} chatContext - The chat context containing configuration and state
   */
  constructor(name: string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = DeepSeek;
  }

  /**
   * Makes an HTTP request to the DeepSeek chat completions endpoint.
   * Constructs the appropriate URL, headers, and payload for DeepSeek API calls.
   * @param {IChatRequestMessage[]} messages - Array of chat messages to send
   * @param {string} [msgId] - Optional message identifier
   * @returns {Promise<Response>} Promise that resolves to the HTTP response
   * @protected
   */
  protected async makeRequest(
    messages: IChatRequestMessage[],
    msgId?: string,
  ): Promise<Response> {
    const provider = this.context.getProvider();
    const url = urlJoin('/chat/completions', provider.apiBase.trim());
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey.trim()}`,
    };
    const isStream = this.context.isStream();
    const payload = await this.makePayload(messages, msgId);
    return this.makeHttpRequest(url, headers, payload, isStream);
  }
}