import { Button, Spinner } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A button component that displays different states based on loading status.
 * When loading is true, shows a spinner and waiting text. When loading is false,
 * shows the provided icon and children content.
 * 
 * @param props - The component props
 * @param props.loading - Whether the button is in a loading state
 * @param props.icon - The icon to display when not loading
 * @param props.children - The content to display when not loading
 * @param props.rest - Additional props passed to the underlying Button component
 * @param ref - React ref forwarded to the Button component
 * @returns A Button component with loading state functionality
 */
function StateButton(
  { loading, icon, children, ...rest }: { loading: boolean } & any,
  ref: any,
) {
  const { t } = useTranslation();
  return (
    <Button
      {...rest}
      ref={ref}
      disabled={loading}
      icon={loading ? <Spinner size="extra-tiny" /> : icon}
    >
      {loading ? t('Common.Waiting') : children}
    </Button>
  );
}

export default forwardRef(StateButton);