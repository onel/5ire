import { capitalize, isNil } from 'lodash';
import { IChatModelConfig } from 'providers/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A React component that renders a capability tag for chat models.
 * Displays different capabilities (json, tools, vision) with appropriate styling and visual indicators.
 * 
 * @param props - Component props
 * @param props.model - The chat model configuration containing capabilities information
 * @param props.capability - The specific capability to display ('json' | 'tools' | 'vision')
 * @returns JSX element representing the capability tag, or null if the capability is not supported
 */
export default function CapabilityTag(
  props: {
    model: IChatModelConfig;
    capability: 'json' | 'tools' | 'vision';
  } & any,
) {
  const { model, capability: capabilityName } = props;

  /**
   * Retrieves the capability configuration from the model.
   * Returns the capability object if it exists, otherwise null.
   */
  const capability = useMemo(() => {
    return (
      model.capabilities[capabilityName as keyof typeof model.capabilities] ||
      null
    );
  }, [model]);

  /**
   * Determines if the model originally supports this capability.
   * Returns true if the capability exists in the model configuration.
   */
  const originalSupport = useMemo(() => {
    if (isNil(capability)) return false;
    return true;
  }, [capability]);

  /**
   * Determines if the capability is currently enabled.
   * Returns true if the capability is enabled, false otherwise.
   */
  const actualSupport = useMemo(() => {
    return capability?.enabled || false;
  }, [capability]);

  const { t } = useTranslation();

  /**
   * Computes the CSS classes for the tag background and text colors.
   * Returns different color schemes based on the capability type.
   */
  const tagColorCls = useMemo<string>(() => {
    return (
      {
        json: 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-300',
        tools:
          'bg-[#d8e6f1] dark:bg-[#365065] text-[#546576] dark:text-[#e3e9e5]',
        vision:
          'bg-[#e6ddee] dark:bg-[#4e3868] text-[#9e7ebd] dark:text-[#d9d4de]',
      } as { [key: string]: string }
    )[capabilityName];
  }, [capabilityName]);

  /**
   * Computes the CSS classes for the status indicator dot colors.
   * Returns different dot colors based on the capability type.
   */
  const dotColorCls = useMemo<string>(() => {
    return (
      {
        json: 'bg-teal-400 bg:text-teal-600',
        tools: 'bg-[#546576] bg:text-[#46799f]',
        vision: 'bg-[#9e7ebd] bg:text-[#8d60c3]',
      } as { [key: string]: string }
    )[capabilityName];
  }, [capabilityName]);

  return originalSupport ? (
    <div
      style={{ fontSize: '10px' }}
      className={`flex text-center justify-start gap-1 items-center rounded-full text-xs px-1.5 py-[1px] ${actualSupport ? tagColorCls : 'bg-gray-100 dark:bg-zinc-700 text-gray-400 dark:text-gray-500'}`}
    >
      <div
        style={{ fontSize: '8px' }}
        className={`flex-shrink-0 w-2 h-2 rounded-full ${
          actualSupport
            ? dotColorCls
            : 'border border-gray-400 bg:border-gray-500'
        }`}
      />
      <span className="-mt-0.5">{t(`Tags.${capitalize(capabilityName)}`)}</span>
    </div>
  ) : null;
}