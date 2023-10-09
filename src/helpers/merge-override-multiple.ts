import { isRegExp } from 'node:util/types';

import { IOptionsWithoutPlugins, IPrettierOverride } from '~/contracts';

import { isNotEmpty } from './is-not-empty';
import { IMergeOverrideOptions, mergeOverride } from './merge-override';

export interface IMergeOverrideMultipleOptions<TOptions extends IOptionsWithoutPlugins = IOptionsWithoutPlugins>
  extends IMergeOverrideOptions<TOptions> {
  /**
   * Filters on what files to apply this config to merge. If omitted, it applies to all original configs.
   */
  filesCriteria?: string | string[] | RegExp;
}

export const mergeOverrideMultiple = <TOptions extends IOptionsWithoutPlugins = IOptionsWithoutPlugins>(
  originalConfigs: IPrettierOverride<TOptions>[],
  ...options: IMergeOverrideMultipleOptions<TOptions>[]
): IPrettierOverride<TOptions>[] => {
  if (!isNotEmpty(options)) {
    return originalConfigs;
  }

  // Clone the original configs so we don't mutate the original configs
  const newConfigs: IPrettierOverride<TOptions>[] = originalConfigs.map((config) => ({ ...config }));

  for (const option of options) {
    const filteredConfigs = newConfigs.filter((config) => {
      if (!isNotEmpty(option.filesCriteria)) {
        // Its applied to all elements
        return true;
      }

      const filesCriteria = option.filesCriteria;

      const files = typeof config.files === 'string' ? [config.files] : config.files;

      return files.some((file) => {
        if (isRegExp(filesCriteria)) {
          return filesCriteria.test(file);
        }

        const searchStrings = typeof filesCriteria === 'string' ? [filesCriteria] : filesCriteria;

        return searchStrings.some((searchString) => file.includes(searchString));
      });
    });

    for (const config of filteredConfigs) {
      const newConfig = mergeOverride(config, option);

      config.files = newConfig.files;

      if (isNotEmpty(newConfig.options)) {
        config.options = newConfig.options;
      }

      if (isNotEmpty(newConfig.excludeFiles)) {
        config.excludeFiles = newConfig.excludeFiles;
      }
    }
  }

  return newConfigs;
};
