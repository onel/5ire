import { IChatContext, IChatRequestMessage } from 'intellichat/types';
import { urlJoin } from 'utils/util';
import OpenAIChatService from './OpenAIChatService';
import Perplexity from '../../providers/Perplexity';
import INextChatService from './INextCharService';

/**
 * Chat service implementation for Perplexity provider.
 * Extends OpenAIChatService to provide Perplexity-specific chat functionality.
 */
export default class PerplexityChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new PerplexityChatService instance.
   * @param {string} name - The name identifier for this chat service
   * @param {IChatContext} chatContext - The chat context containing configuration and state
   */
  constructor(name: string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = Perplexity;
  }

  /**
   * Makes an HTTP request to the Perplexity chat completions endpoint.
   * Constructs the request URL, headers, and payload for the Perplexity API.
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
    const payload = await this.makePayload(messages, msgId);
    const url = urlJoin('/chat/completions', provider.apiBase.trim());
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey.trim()}`,
    };
    const isStream = this.context.isStream();
    return this.makeHttpRequest(url, headers, payload, isStream);
  }
}