import { Button, Input } from '@fluentui/react-components';
import { Eye20Filled, EyeOff20Filled } from '@fluentui/react-icons';
import { forwardRef, useState } from 'react';

/**
 * A maskable input component that allows users to toggle between hidden and visible text display.
 * Renders an input field with a toggle button that switches between password (masked) and text (visible) modes.
 * 
 * @param props - All props are passed through to the underlying Fluent UI Input component
 * @param ref - React ref to be forwarded to the Input component
 * @returns JSX element containing the input with toggle functionality
 */
function MaskableInput(props: any, ref: any) {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <Input
      {...props}
      type={showRaw ? 'text' : 'password'}
      contentAfter={
        showRaw ? (
          <Button
            size="small"
            icon={<EyeOff20Filled />}
            appearance="subtle"
            onClick={() => setShowRaw(false)}
          />
        ) : (
          <Button
            size="small"
            icon={<Eye20Filled />}
            appearance="subtle"
            onClick={() => setShowRaw(true)}
          />
        )
      }
    />
  );
}

export default forwardRef(MaskableInput);