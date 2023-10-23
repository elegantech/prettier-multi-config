import { IOptionsWithoutPlugins, IPrettierPreset } from '~/contracts';

/**
 * @link https://github.com/electrovir/prettier-plugin-multiline-arrays?tab=readme-ov-file#options
 */
export interface IMultilineOptions extends IOptionsWithoutPlugins {
  /**
   * This should be set to a single number which controls when arrays wrap.
   * If an array has more elements than the number specified here, it will be forced to wrap.
   * This option defaults to -1, which indicates that no automatic wrapping will take place.
   *
   * @default -1
   */
  multilineArraysWrapThreshold?: number;

  /**
   * This should be set to a string which contains a space separated list of numbers. These numbers allow
   * fine grained control over how many elements appear in each line. The pattern will repeat if an array
   * has more elements than the pattern.
   *
   * @default '1'
   */
  multilineArraysLinePattern?: string;
}

// TODO: Include multiline array plugin when compatible with Prettier 3
// (https://github.com/electrovir/prettier-plugin-multiline-arrays/issues/26)

/**
 * Preset for multiline elements.
 *
 * @link https://github.com/electrovir/prettier-plugin-multiline-arrays
 */
export const preset: IPrettierPreset<IMultilineOptions> = {
  globalOptions: {
    multilineArraysWrapThreshold: 1,
  },

  plugins: [
    //
    'prettier-plugin-multiline-arrays',
  ],

  overrideConfigs: [
    // TODO: Add configs for language
  ],
};
