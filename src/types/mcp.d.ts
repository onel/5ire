/**
 * Defines the type of MCP server connection
 */
export type MCPServerType = 'local' | 'remote';

/**
 * Interface defining the structure of an MCP server configuration
 */
export interface IMCPServer {
  /** Unique identifier for the server */
  key: string;
  /** Type of server connection (local or remote) */
  type: MCPServerType;
  /** Optional display name for the server */
  name?: string;
  /** URL for remote server connections */
  url?: string;
  /** Command to execute for local server connections */
  command?: string;
  /** Human-readable description of the server */
  description?: string;
  /** Command line arguments for local server execution */
  args?: string[];
  /** Environment variables to set for the server process */
  env?: Record<string, string>;
  /** HTTP headers to include in requests to remote servers */
  headers?: Record<string, string>;
  /** Whether the server is currently active */
  isActive: boolean;
  /** Optional homepage URL for the server */
  homepage?: string;
  /** Optional proxy URL for this server connection */
  proxy?: string; // Optional: Proxy URL for this entrypoint (e.g., "http://localhost:8080")
}

/**
 * Defines the supported argument parameter types
 */
export type MCPArgType = 'string' | 'list' | 'number';

/**
 * Defines the supported environment variable types
 */
export type MCPEnvType = 'string' | 'number';

/**
 * Maps parameter names to their argument types
 */
export type MCPArgParameter = { [key: string]: MCPArgType };

/**
 * Maps parameter names to their environment variable types
 */
export type MCPEnvParameter = { [key: string]: MCPEnvType };

/**
 * Interface defining the structure of an MCP server parameter
 */
export interface IMCPServerParameter {
  /** Name of the parameter */
  name: string;
  /** Type of the parameter value */
  type: MCPArgType | MCPEnvType;
  /** Description explaining the parameter's purpose */
  description: string;
}

/**
 * Interface defining the complete MCP configuration structure
 */
export interface IMCPConfig {
  /** @deprecated Legacy servers array - use mcpServers instead */
  servers?: IMCPServer[]; // Deprecated
  /** Map of server keys to their configurations */
  mcpServers: {
    [key: string]: IMCPServer;
  };
  /** Optional timestamp of last configuration update */
  updated?: number;
}