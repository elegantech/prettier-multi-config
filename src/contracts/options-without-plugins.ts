import { Options } from 'prettier';

/**
 * Format options for override (without plugins key).
 */
export interface IOptionsWithoutPlugins extends Omit<Options, 'plugins'> {}
