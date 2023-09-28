import { Plugin } from 'prettier';
import { IOptionsWithoutPlugins } from './options-without-plugins';
import { IPrettierOverride } from './prettier-override';

export type PresetPlugins = Array<string | Plugin>;

export interface IPrettierPreset<TOptions extends IOptionsWithoutPlugins = IOptionsWithoutPlugins> {
  /**
   * Options to be applied as general for the preset.
   */
  globalOptions: TOptions;

  /**
   * Required plugins for the preset.
   */
  plugins: PresetPlugins;

  /**
   * Config to be merged in `override` for the preset.
   */
  overrideConfigs: IPrettierOverride<TOptions>[];
}
