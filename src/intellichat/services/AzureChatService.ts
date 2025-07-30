import { IChatContext, IChatRequestMessage } from 'intellichat/types';
import { urlJoin } from 'utils/util';
import OpenAIChatService from './OpenAIChatService';
import Azure from '../../providers/Azure';
import INextChatService from './INextCharService';

/**
 * Azure-specific chat service implementation that extends OpenAI chat service
 * to work with Azure OpenAI endpoints and authentication.
 */
export default class AzureChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new AzureChatService instance.
   * @param {string} name - The name identifier for this chat service
   * @param {IChatContext} chatContext - The chat context containing configuration and state
   */
  constructor(name: string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = Azure;
  }

  /**
   * Makes an HTTP request to the Azure OpenAI chat completions endpoint.
   * Constructs the Azure-specific URL with deployment ID and API version,
   * and sets up proper authentication headers.
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
    const model = this.context.getModel();
    const deploymentId = model.extras?.deploymentId || model.name;
    const url = urlJoin(
      `/openai/deployments/${deploymentId}/chat/completions?api-version=${provider.apiVersion}`,
      provider.apiBase.trim(),
    );
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey.trim()}`,
    };
    const isStream = this.context.isStream();
    const payload = await this.makePayload(messages, msgId);
    return this.makeHttpRequest(url, headers, payload, isStream);
  }
}