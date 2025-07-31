import React, { createContext, useContext, useEffect, useRef } from 'react';

/**
 * Function type for handling context menu commands.
 * @param command - The command string to execute
 * @param params - Additional parameters for the command
 */
type ContextMenuHandler = (command: string, params: any) => void;

/**
 * Interface defining the context menu management functionality.
 */
interface ContextMenuManager {
  /**
   * Registers a handler for context menu commands.
   * @param type - The type of the context menu item
   * @param id - The unique identifier for the handler
   * @param handler - The function to handle context menu commands
   */
  registerHandler: (
    type: string,
    id: string,
    handler: ContextMenuHandler,
  ) => void;
  /**
   * Unregisters a previously registered context menu handler.
   * @param type - The type of the context menu item
   * @param id - The unique identifier for the handler to remove
   */
  unregisterHandler: (type: string, id: string) => void;
}

const ContextMenuContext = createContext<ContextMenuManager>({
  registerHandler: () => {},
  unregisterHandler: () => {},
});

/**
 * Provider component that manages context menu handlers and IPC communication.
 * Sets up listeners for context menu commands from the main process and provides
 * registration/unregistration functionality to child components.
 * @param props - Component props
 * @param props.children - Child React nodes to wrap with context menu functionality
 * @returns JSX element providing context menu management to children
 */
export function ContextMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const handlersRef = useRef<Map<string, ContextMenuHandler>>(new Map());

  useEffect(() => {
    const handleContextMenuCommand = (command: unknown, params: unknown) => {
      const { type, id } = params as { type: string; id: string };
      const key = `${type}:${id}`;
      const handler = handlersRef.current.get(key);

      if (handler) {
        handler(command as string, params);
      } else {
        console.warn(`No handler found for key: ${key}`);
      }
    };

    // 使用 on 方法返回的 unsubscribe 函数
    const unsubscribeContextMenu = window.electron.ipcRenderer.on(
      'context-menu-command',
      handleContextMenuCommand,
    );

    console.log('ContextMenuProvider: Listeners registered');

    return () => {
      console.log('ContextMenuProvider: Cleaning up listeners');
      unsubscribeContextMenu();
    };
  }, []);

  /**
   * Registers a context menu handler for a specific type and id combination.
   * @param type - The type of the context menu item
   * @param id - The unique identifier for the handler
   * @param handler - The function to handle context menu commands
   */
  const registerHandler = (
    type: string,
    id: string,
    handler: ContextMenuHandler,
  ) => {
    const key = `${type}:${id}`;
    handlersRef.current.set(key, handler);
  };

  /**
   * Unregisters a context menu handler for a specific type and id combination.
   * @param type - The type of the context menu item
   * @param id - The unique identifier for the handler to remove
   */
  const unregisterHandler = (type: string, id: string) => {
    const key = `${type}:${id}`;
    handlersRef.current.delete(key);
  };

  return (
    <ContextMenuContext.Provider value={{ registerHandler, unregisterHandler }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

/**
 * Hook to access context menu management functionality.
 * Must be used within a ContextMenuProvider component.
 * @returns Object containing registerHandler and unregisterHandler functions
 */
export const useContextMenu = () => useContext(ContextMenuContext);