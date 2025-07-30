import {
  Field,
  Button,
  Input,
  Textarea,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-components';
import { Search24Regular, Dismiss24Regular } from '@fluentui/react-icons';
import Debug from 'debug';
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
  useEffect,
} from 'react';
import useChatStore from 'stores/useChatStore';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { isPersistedChat } from 'utils/util';

const debug = Debug('5ire:pages:chat:ChatSettingsDrawer');

/**
 * A drawer component that provides chat settings interface including search functionality
 * and system message editing capabilities.
 * 
 * @param props - The component props
 * @param props.open - Whether the drawer is currently open
 * @param props.setOpen - Function to control the drawer's open/closed state
 * @returns The chat settings drawer component
 */
export default function ChatSettingsDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const activeChat = useChatStore((state) => state.chat);

  useEffect(() => {
    setSystemMessage(activeChat.systemMessage || '');
  }, [activeChat?.id, activeChat.systemMessage]);

  const setKeyword = useChatStore((state) => state.setKeyword);
  const keywords = useChatStore((state) => state.keywords);

  const keyword = useMemo(
    () => keywords[activeChat?.id] || '',
    [keywords, activeChat?.id],
  );

  const [systemMessage, setSystemMessage] = useState<string>();

  const editStage = useChatStore((state) => state.editStage);

  /**
   * Handles keyboard events for the search input field.
   * Closes the drawer when Enter key is pressed without Shift modifier.
   * 
   * @param event - The keyboard event from the search input
   */
  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      setOpen(false);
    }
  };

  /**
   * Handles changes to the system message textarea.
   * Updates local state and triggers debounced save operation.
   * 
   * @param ev - The change event from the textarea
   */
  const onSystemMessageChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setSystemMessage(ev.target.value);
    updateSystemMessage(ev);
  };

  /**
   * Debounced function that saves system message changes to the store.
   * Waits 1 second after the last change before saving.
   */
  const updateSystemMessage = useMemo(
    () =>
      debounce(async (ev: ChangeEvent<HTMLTextAreaElement>) => {
        const systemMessage = ev.target.value;
        await editStage(activeChat.id, { systemMessage });
      }, 1000),
    [activeChat?.id],
  );

  return (
    <div>
      <Drawer
        position="end"
        open={open}
        onOpenChange={(_, { open }) => setOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            &nbsp;
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody className="mt-2.5 flex flex-col gap-2 relative">
          {isPersistedChat(activeChat) ? (
            <div className="mb-2.5">
              <Input
                id="inchat-search"
                contentBefore={<Search24Regular />}
                placeholder={t('Chat.InConversationSearch')}
                className="w-full"
                value={keyword}
                onKeyDown={onSearchKeyDown}
                onChange={(e, data) => {
                  setKeyword(activeChat?.id, data.value);
                }}
              />
            </div>
          ) : null}
          <div className="mb-1.5">
            <Divider>{t('Common.Settings')}</Divider>
          </div>
          <div className="mb-4">
            <Field label={t('Common.SystemMessage')}>
              <Textarea
                rows={40}
                value={systemMessage}
                onChange={onSystemMessageChange}
                resize="vertical"
              />
            </Field>
          </div>
          <div className="flex-grow" />
        </DrawerBody>
      </Drawer>
    </div>
  );
}