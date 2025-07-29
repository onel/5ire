import { forwardRef } from 'react';
import './Spinner.scss';

/**
 * A loading spinner component that displays an animated spinning indicator.
 * The component renders four div elements that are styled via CSS to create a spinning animation.
 * 
 * @param props - The component props
 * @param props.size - The width and height of the spinner in pixels. Defaults to 24.
 * @param props.className - Additional CSS classes to apply to the spinner container. Defaults to empty string.
 * @param ref - React ref that will be forwarded to the spinner container div element
 * @returns A div element containing four child divs that form the spinning animation
 */
function Spinner(
  {
    size = 24,
    className = '',
  }: {
    size?: number;
    className?: string;
  },
  ref: any,
) {
  return (
    <div
      className={`spinner ${className}`}
      ref={ref}
      style={{ width: size, height: size }}
    >
      <div style={{ width: size, height: size }} />
      <div style={{ width: size, height: size }} />
      <div style={{ width: size, height: size }} />
      <div style={{ width: size, height: size }} />
    </div>
  );
}
export default forwardRef(Spinner);