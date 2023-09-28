import { IOptionsWithoutPlugins } from './options-without-plugins';

export interface IPrettierOverride<TOptions extends IOptionsWithoutPlugins = IOptionsWithoutPlugins> {
  /**
   * List of files to be formatted.
   */
  files: string | string[];

  /**
   * Exceptions.
   */
  excludeFiles?: string | string[];

  /**
   * Format options.
   */
  options?: TOptions;
}
