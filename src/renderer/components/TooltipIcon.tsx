import { PositioningShorthand, Tooltip } from '@fluentui/react-components';
import { Info16Regular } from '@fluentui/react-icons';
import { ReactNode } from 'react';

/**
 * Renders an information icon with a tooltip that displays additional content when hovered or focused.
 * The component conditionally renders based on whether tip content is provided.
 * 
 * @param props - The component props
 * @param props.tip - The content to display in the tooltip. Can be a string or React node. If null/undefined, no tooltip is rendered.
 * @param props.positioning - The positioning of the tooltip relative to the icon. Defaults to 'above-start'.
 * @returns A tooltip with an info icon if tip content is provided, otherwise null
 */
export default function TooltipIcon({
  tip,
  positioning = 'above-start',
}: {
  tip: string | undefined | null | ReactNode;
  positioning?: PositioningShorthand;
}) {
  return tip ? (
    <Tooltip
      content={{
        children: tip,
      }}
      positioning={positioning}
      withArrow
      relationship="label"
    >
      <Info16Regular tabIndex={0} className="inline-block ml-1.5" />
    </Tooltip>
  ) : null;
}