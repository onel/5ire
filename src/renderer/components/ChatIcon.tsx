import { Tooltip } from '@fluentui/react-components';
import { Chat20Filled, Chat20Regular } from '@fluentui/react-icons';
import { IChat } from 'intellichat/types';
import useChatStore from 'stores/useChatStore';
import Spinner from './Spinner';

/**
 * Renders a chat icon with tooltip that displays different states based on loading and active status.
 * Shows a spinner when loading, filled icon when active, or regular icon when inactive.
 * 
 * @param props - The component props
 * @param props.chat - The chat object containing id, name, and summary information
 * @param props.isActive - Whether this chat is currently active/selected
 * @returns JSX element containing the chat icon wrapped in a tooltip
 */
export default function ChatIcon({
  chat,
  isActive,
}: {
  chat: IChat;
  isActive: boolean;
}) {
  const chatStates = useChatStore((state) => state.states);

  /**
   * Determines which icon to render based on the chat's loading state and active status.
   * 
   * @returns JSX element - Spinner if loading, Chat20Filled if active, or Chat20Regular if inactive
   */
  const renderChatIcon = () => {
    if (chatStates[chat.id]?.loading) {
      return <Spinner size={18} />;
    }
    if (isActive) {
      return <Chat20Filled />;
    }
    return <Chat20Regular />;
  };

  return (
    <Tooltip
      withArrow
      content={chat.name || chat.summary?.substring(0, 200)}
      relationship="label"
      positioning="above-start"
    >
      {renderChatIcon()}
    </Tooltip>
  );
}