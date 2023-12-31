import { IOptionsWithoutPlugins, IPrettierOverride, PresetPlugins } from '~/contracts';
import { IMergeOverrideMultipleOptions, isNotEmpty, mergeOverrideMultiple } from '~/helpers';

import { preset as base } from './base';
import { preset as multiline } from './multiline';
import { preset as php } from './php';
import { preset as sh } from './sh';

/**
 * List of available presets.
 */
export const AVAILABLE_PRESETS = [
  'base',
  'php',
  'sh',
  'multiline',
] as const;

export type PresetName = (typeof AVAILABLE_PRESETS)[number];

/**
 * Checks if specified string is a preset name and if it's available.
 *
 * @example
 * if (isAvailablePreset('php')) {
 *   // ...
 * }
 */
export const isAvailablePreset = (value: string): value is PresetName => {
  return AVAILABLE_PRESETS.includes(value as PresetName);
};

/**
 * Map of available presets.
 */
export const PRESETS_MAP = {
  base,
  php,
  sh,
  multiline,
} as const;

export type PresetMap = typeof PRESETS_MAP;

// Utility types to extract options type
export type PresetOptions<TPreset extends PresetName> = PresetMap[TPreset]['globalOptions'];
export type MergeOptions<TPreset extends PresetName> = IMergeOverrideMultipleOptions<PresetOptions<TPreset>>;

/**
 * Gets the merged global options for specified preset(s).
 *
 * @example
 * const config = {
 *   ...getMergedGlobalOptionsFor(['base', 'php']),
 *   // plugins: [...]
 * }
 */
export const getMergedGlobalOptionsFor = (
  presetNames: PresetName[],
  customOptions?: PresetOptions<PresetName>
): IOptionsWithoutPlugins => {
  const options: IOptionsWithoutPlugins[] = presetNames.map((presetName) => PRESETS_MAP[presetName].globalOptions);

  if (isNotEmpty(customOptions)) options.push(customOptions);

  // eslint-disable-next-line unicorn/no-array-reduce
  return options.reduce((accumulator, preset) => {
    return {
      ...accumulator,
      ...preset,
    };
  }, {});
};

/**
 * Merges and/or replaces the specified config with the values of the otherConfig.
 *
 * @param configName Name of compatible preset.
 * @param mergeOptions
 *
 * @example
 * const config = {
 *   // Global options...
 *   // plugins: [...]
 *   overrides: [
 *    ...getMergedOverrideFor('base'),
 *    ...getMergedOverrideFor('php', { config: { options: { phpVersion: '8.1' } } })
 *   ]
 * }
 */
export const getMergedOverrideFor = <TPreset extends PresetName>(
  configName: TPreset,
  ...mergeOptions: MergeOptions<TPreset>[]
): IPrettierOverride<PresetOptions<TPreset>>[] => {
  const config = PRESETS_MAP[configName];

  if (!config) {
    throw new Error(`Preset ${configName} not found.`);
  }

  return mergeOverrideMultiple(config.overrideConfigs, ...mergeOptions);
};

/**
 * Gets all plugins of the specified preset(s).
 *
 * Duplicated values are removed.
 *
 * Note: Remember to install the referenced plugins (check the documentation for what plugins are included in presets).
 *
 * @param presets Presets plugins to be included.
 * @param extraPlugins Your own plugins to be enabled.
 *
 *
 * @example
 * const config = {
 *   // Global options...
 *   plugins: getPluginsFor(['base', 'php'], ['my-extra-prettier-plugin']),
 *   // overrides: [...]
 * }
 */
export const getPluginsFor = (presets: PresetName[], extraPlugins: PresetPlugins = []): PresetPlugins => {
  presets = [...new Set(presets)];

  const allPlugins = presets.flatMap((name) => {
    return PRESETS_MAP[name].plugins;
  });

  allPlugins.push(...extraPlugins);

  return [...new Set(allPlugins)];
};
