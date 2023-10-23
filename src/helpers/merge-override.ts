import { IOptionsWithoutPlugins, IPrettierOverride } from '~/contracts';

import { isNotEmpty } from './is-not-empty';

export interface IMergeOverrideOptions<TOptions extends IOptionsWithoutPlugins = IOptionsWithoutPlugins> {
  /**
   * List of options to replace instead of being merged in the original.
   */
  replace?: Array<keyof IPrettierOverride<TOptions>>;

  /**
   * Config to be merged into the original.
   */
  config: Partial<IPrettierOverride<TOptions>>;
}

/**
 * Merges and/or replaces the originalConfig the values of the otherConfig.
 *
 * @param originalConfig Original config.
 * @param otherConfig Values to be merged with the original object values. Sub-key of object values are replaced if present.
 * @param mergeOptions
 */
export const mergeOverride = <TOptions extends IOptionsWithoutPlugins = IOptionsWithoutPlugins>(
  originalConfig: IPrettierOverride<TOptions>,
  mergeOptions?: IMergeOverrideOptions<TOptions>
): IPrettierOverride<TOptions> => {
  if (!mergeOptions) {
    return originalConfig;
  }

  const otherConfig = mergeOptions.config;

  const newConfig = { ...originalConfig };

  // files
  if (isNotEmpty(otherConfig.files)) {
    let files: string | string[] = newConfig.files;

    if (mergeOptions?.replace?.includes('files')) {
      files = otherConfig.files;
    } else {
      if (typeof files === 'string') {
        files = [files];
      }

      files = [
        ...files,
        ...otherConfig.files,
      ];
    }

    newConfig.files = files;
  }

  // options
  if (isNotEmpty(otherConfig.options)) {
    let options = newConfig.options ?? otherConfig.options;

    if (isNotEmpty(newConfig.options)) {
      options = mergeOptions?.replace?.includes('options')
        ? otherConfig.options
        : { ...options, ...otherConfig.options };
    }

    newConfig.options = options;
  }

  // excludeFiles
  if (isNotEmpty(otherConfig.excludeFiles)) {
    let excludeFiles = newConfig.excludeFiles ?? otherConfig.excludeFiles;

    if (isNotEmpty(newConfig.excludeFiles)) {
      if (mergeOptions?.replace?.includes('excludeFiles')) {
        excludeFiles = otherConfig.excludeFiles;
      } else {
        if (typeof excludeFiles === 'string') {
          excludeFiles = [excludeFiles];
        }

        excludeFiles = [
          ...excludeFiles,
          ...otherConfig.excludeFiles,
        ];
      }
    }

    newConfig.excludeFiles = excludeFiles;
  }

  return newConfig;
};
