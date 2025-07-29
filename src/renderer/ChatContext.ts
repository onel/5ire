import Debug from 'debug';
import useChatStore from 'stores/useChatStore';
import { DEFAULT_MAX_TOKENS, NUM_CTX_MESSAGES, TEMP_CHAT_ID } from 'consts';
import { find, isNil, isNumber } from 'lodash';
import { isValidMaxTokens, isValidTemperature } from 'intellichat/validators';

import { IChat, IChatContext, IChatMessage, IPrompt } from 'intellichat/types';
import { IChatModelConfig, IChatProviderConfig } from 'providers/types';
import useProviderStore from 'stores/useProviderStore';

const debug = Debug('5ire:renderer:ChatContext');

/**
 * Creates a chat context object that provides access to chat configuration and state
 * @param {string} [chatId] - Optional chat ID to target a specific chat
 * @returns {IChatContext} Chat context object with methods to access chat data
 */
const createChatContext = (chatId?: string): IChatContext => {
  /**
   * Retrieves the currently active chat
   * @returns {IChat} The active chat object
   */
  const getActiveChat = () => {
    if (chatId && chatId !== TEMP_CHAT_ID) {
      const { chats } = useChatStore.getState();
      const chat = chats?.find((c) => c.id === chatId) as IChat;
      if (chat) {
        return chat;
      }
    }

    const { chat } = useChatStore.getState();
    return chat as IChat;
  };

  /**
   * Gets the provider configuration for the active chat
   * @returns {IChatProviderConfig} The provider configuration object
   */
  const getProvider = () => {
    const chat = getActiveChat();
    const { getAvailableProvider, getDefaultProvider } =
      useProviderStore.getState();
    debug(`getProvider: chat(${chat.summary || ''})`, chat.provider);
    if (chat.provider) {
      return getAvailableProvider(chat.provider);
    }
    return getDefaultProvider();
  };

  /**
   * Gets the model configuration for the active chat
   * @returns {IChatModelConfig} The model configuration object
   */
  const getModel = () => {
    const chat = getActiveChat();
    const { getAvailableModel, getModelsSync } = useProviderStore.getState();
    if (chat.provider && chat.model) {
      const model = getAvailableModel(chat.provider, chat.model);
      debug(`getModel by chat(${chat.provider}/${chat.model})`, model);
      return model;
    }
    const provider = getProvider();
    const models = getModelsSync(provider);
    const model =
      (find(models, { isDefault: true }) as IChatModelConfig) || models[0];
    debug(`getModel by default`, model);
    return model;
  };

  /**
   * Retrieves the system message for the active chat
   * @returns {string | null} The system message or null if not set
   */
  const getSystemMessage = () => {
    const chat = getActiveChat();
    const prompt = chat.prompt as IPrompt | null;
    const systemMessage = prompt?.systemMessage || chat?.systemMessage || null;
    // debug(`Chat(${chat.id}):getSystemMessage: ${systemMessage}`);
    return systemMessage;
  };

  /**
   * Gets the temperature setting for the active chat
   * @returns {number} The temperature value to use for generation
   */
  const getTemperature = (): number => {
    const chat = getActiveChat();
    const provider = getProvider() as IChatProviderConfig;
    let temperature = provider?.temperature.default as number;
    const prompt = chat.prompt as IPrompt | null;
    if (isValidTemperature(prompt?.temperature, provider.name)) {
      temperature = prompt?.temperature as number;
    }
    if (isValidTemperature(chat?.temperature, provider.name)) {
      temperature = chat?.temperature as number;
    }
    // debug(`Chat(${chat.id}):getTemperature: ${temperature}`);
    return temperature;
  };

  /**
   * Gets the maximum tokens setting for the active chat
   * @returns {number} The maximum number of tokens to generate
   */
  const getMaxTokens = () => {
    const chat = getActiveChat();
    const provider = getProvider() as IChatProviderConfig;
    const model = getModel() as IChatModelConfig;
    let maxTokens =
      model?.defaultMaxTokens || model?.maxTokens || DEFAULT_MAX_TOKENS;
    const prompt = chat.prompt as IPrompt | null;
    if (
      prompt?.maxTokens != null &&
      isValidMaxTokens(prompt?.maxTokens, provider?.name, model?.name as string)
    ) {
      maxTokens = prompt?.maxTokens || (prompt?.maxTokens as number);
    }
    // console.log('chat?.maxTokens', chat?.maxTokens);
    if (
      chat?.maxTokens != null &&
      isValidMaxTokens(chat?.maxTokens, provider?.name, model?.name as string)
    ) {
      maxTokens = chat?.maxTokens as number;
    }
    // debug(`Chat(${chat.id}):getMaxTokens: ${maxTokens}`);
    return maxTokens as number;
  };

  /**
   * Retrieves the chat context string for the active chat
   * @returns {string} The chat context or empty string if not set
   */
  const getChatContext = () => {
    const chat = getActiveChat();
    const chatContext = chat?.context || '';
    // debug(`Chat(${chat.id}):getChatContext: ${chatContext}`);
    return chatContext;
  };

  /**
   * Checks if streaming is enabled for the active chat
   * @returns {boolean} True if streaming is enabled, false otherwise
   */
  const isStream = () => {
    const chat = getActiveChat();
    let stream = true;
    if (!isNil(chat?.stream)) {
      stream = chat.stream;
    }
    // debug(`Chat(${chat.id}):isStream: ${stream}`);
    return stream;
  };

  /**
   * Checks if the chat context is ready for use
   * @returns {boolean} True if both provider and model are ready
   */
  const isReady = () => {
    const $provider = getProvider();
    const $model = getModel();
    return $provider.isReady && $model?.isReady;
  };

  /**
   * Gets the context messages for the active chat
   * @param {string} [msgId] - Optional message ID to limit context to messages before this ID
   * @returns {IChatMessage[]} Array of context messages
   */
  const getCtxMessages = (msgId?: string) => {
    const chat = getActiveChat();
    let ctxMessages: IChatMessage[] = [];
    const maxCtxMessages = isNumber(chat?.maxCtxMessages)
      ? chat?.maxCtxMessages
      : NUM_CTX_MESSAGES;
    if (maxCtxMessages > 0) {
      let messages = useChatStore.getState().messages || [];
      if (msgId) {
        const index = messages.findIndex((m) => m.id === msgId);
        if (index > -1) {
          messages = messages.slice(0, index);
        }
      }
      messages = messages.filter((m) => m.prompt && m.reply);
      if (messages.length > maxCtxMessages) {
        ctxMessages = messages.slice(-maxCtxMessages);
      } else {
        ctxMessages = messages;
      }
    }
    // debug(`Chat(${chat.id}):getCtxMessages: ${ctxMessages.length} messages`);
    return ctxMessages;
  };

  return {
    getActiveChat,
    getProvider,
    getModel,
    getSystemMessage,
    getCtxMessages,
    getTemperature,
    getMaxTokens,
    getChatContext,
    isStream,
    isReady,
  } as IChatContext;
};

export default createChatContext();

export { createChatContext };