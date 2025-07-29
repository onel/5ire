import Debug from 'debug';
import { IChatContext } from '../types';
import AnthropicChatService from './AnthropicChatService';
import AzureChatService from './AzureChatService';
import OllamaChatService from './OllamaChatService';
import LMStudioChatService from './LMStudioChatService';
import OpenAIChatService from './OpenAIChatService';
import GoogleChatService from './GoogleChatService';
import BaiduChatService from './BaiduChatService';
import MoonshotChatService from './MoonshotChatService';
import MistralChatService from './MistralChatService';
import FireChatService from './FireChatService';
import DoubaoChatService from './DoubaoChatService';
import GrokChatService from './GrokChatService';
import DeepSeekChatService from './DeepSeekChatService';
import INextChatService from './INextCharService';
import PerplexityChatService from './PerplexityChatService';

const debug = Debug('5ire:intellichat:ChatService');

/**
 * Creates a chat service instance based on the provider specified in the chat context.
 * This factory function instantiates the appropriate chat service implementation
 * according to the provider name and returns it as an INextChatService interface.
 * 
 * @param {IChatContext} chatCtx - The chat context containing provider information and configuration
 * @returns {INextChatService} The instantiated chat service for the specified provider
 */
export default function createService(chatCtx: IChatContext): INextChatService {
  const provider = chatCtx.getProvider();
  debug('CreateService', provider.name);
  switch (provider.name) {
    case 'Anthropic':
      return new AnthropicChatService(provider.name, chatCtx);
    case 'OpenAI':
      return new OpenAIChatService(provider.name, chatCtx);
    case 'Azure':
      return new AzureChatService(provider.name, chatCtx);
    case 'Google':
      return new GoogleChatService(provider.name, chatCtx);
    case 'Baidu':
      return new BaiduChatService(provider.name, chatCtx);
    case 'Mistral':
      return new MistralChatService(provider.name, chatCtx);
    case 'Moonshot':
      return new MoonshotChatService(provider.name, chatCtx);
    case 'Ollama':
      return new OllamaChatService(provider.name, chatCtx);
    case '5ire':
      return new FireChatService(provider.name, chatCtx);
    case 'Doubao':
      return new DoubaoChatService(provider.name, chatCtx);
    case 'Grok':
      return new GrokChatService(provider.name, chatCtx);
    case 'DeepSeek':
      return new DeepSeekChatService(provider.name, chatCtx);
    case 'LMStudio':
      return new LMStudioChatService(provider.name, chatCtx);
    case 'Perplexity':
      return new PerplexityChatService(provider.name, chatCtx);
    default:
      return new OpenAIChatService(provider.name, chatCtx);
  }
}