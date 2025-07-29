/**
 * Type definition for CSS module styles object
 * Maps CSS class names to their generated class name strings
 */
type Styles = Record<string, string>;

/**
 * Module declaration for SVG file imports
 * Allows importing SVG files as React components or as string content
 */
declare module '*.svg' {
  import React = require('react');

  /**
   * React component representation of the SVG file
   * Can be used as a standard React component with SVG props
   */
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  /**
   * String content of the SVG file
   * Contains the raw SVG markup as a string
   */
  const content: string;
  export default content;
}

/**
 * Module declaration for PNG image file imports
 * Allows importing PNG files as string URLs
 */
declare module '*.png' {
  /**
   * URL string pointing to the PNG image asset
   */
  const content: string;
  export default content;
}

/**
 * Module declaration for JPG image file imports
 * Allows importing JPG files as string URLs
 */
declare module '*.jpg' {
  /**
   * URL string pointing to the JPG image asset
   */
  const content: string;
  export default content;
}

/**
 * Module declaration for SCSS stylesheet imports
 * Allows importing SCSS files as CSS modules with typed class names
 */
declare module '*.scss' {
  /**
   * Object containing CSS class names as keys and their generated class names as values
   */
  const content: Styles;
  export default content;
}

/**
 * Module declaration for SASS stylesheet imports
 * Allows importing SASS files as CSS modules with typed class names
 */
declare module '*.sass' {
  /**
   * Object containing CSS class names as keys and their generated class names as values
   */
  const content: Styles;
  export default content;
}

/**
 * Module declaration for CSS stylesheet imports
 * Allows importing CSS files as CSS modules with typed class names
 */
declare module '*.css' {
  /**
   * Object containing CSS class names as keys and their generated class names as values
   */
  const content: Styles;
  export default content;
}