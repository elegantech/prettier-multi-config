import { IOptionsWithoutPlugins, IPrettierPreset } from '@/contracts';

export type PhpVersion =
  | '5.0'
  | '5.1'
  | '5.2'
  | '5.3'
  | '5.4'
  | '5.5'
  | '5.6'
  | '7.0'
  | '7.1'
  | '7.2'
  | '7.3'
  | '7.4'
  | '8.0'
  | '8.1'
  | '8.2';

/**
 * @link https://github.com/prettier/plugin-php?tab=readme-ov-file#configuration
 */
export interface IPhpOptions extends IOptionsWithoutPlugins {
  /**
   * Minimum target PHP version.
   *
   * Allows specifying the PHP version you're using. If you're using PHP 7.1 or later, setting this option will make
   * use of modern language features in the printed output. If you're using PHP lower than 7.0, you'll have to set
   * this option or Prettier will generate incompatible code.
   *
   * @default '7.0'
   */
  phpVersion?: PhpVersion;

  /**
   * Print trailing commas wherever possible when multi-line.
   */
  trailingCommaPHP?: boolean;

  /**
   * Print one space or newline for code blocks (classes and functions).
   *
   * @default 'per-cs'
   */
  braceStyle?: 'per-cs' | '1tbs';
}

/**
 * Preset for PHP.
 */
export const preset: IPrettierPreset<IPhpOptions> = {
  globalOptions: {},

  plugins: [
    //
    '@prettier/plugin-php',
  ],

  overrideConfigs: [
    {
      files: ['*.php'],
      options: {
        tabWidth: 4,
        singleQuote: true,
        arrowParens: 'always',
        printWidth: 120,
        endOfLine: 'lf',
        semi: true,

        // Plugin specific
        parser: 'php',
        trailingCommaPHP: true,
        // phpVersion: '7.4', // Use the plugin defaults
      },
    },
  ],
};
