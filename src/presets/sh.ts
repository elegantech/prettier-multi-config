import { IOptionsWithoutPlugins, IPrettierPreset } from '~/contracts';

/**
 * https://github.com/un-ts/prettier/tree/master/packages/sh#parser-options
 */
export interface IBashOptions extends IOptionsWithoutPlugins {
  // parser
  keepComments?: boolean; // default `true`
  stopAt?: string;
  variant?: 0 | 1; // LanguageVariant enum

  // printer
  indent?: number;
  binaryNextLine?: boolean; // default `true`
  switchCaseIndent?: boolean;
  spaceRedirects?: boolean;
  keepPadding?: boolean;
  minify?: boolean;
  functionNextLine?: boolean;

  /**
   * use `sh-syntax` instead
   */
  experimentalWasm?: boolean;
}

/**
 * Preset for Bash Script.
 */
export const preset: IPrettierPreset<IBashOptions> = {
  globalOptions: {},

  plugins: [
    //
    'prettier-plugin-sh',
  ],

  overrideConfigs: [
    {
      files: ['*.sh'],
      options: {
        indent: 4,
        tabWidth: 4,
      },
    },
  ],
};
