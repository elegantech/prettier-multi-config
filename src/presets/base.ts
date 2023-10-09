import { IOptionsWithoutPlugins, IPrettierPreset } from '~/contracts';

export interface IBaseOptions extends IOptionsWithoutPlugins {
  /**
   * Skip destructive code actions.
   *
   * @link https://github.com/simonhaenisch/prettier-plugin-organize-imports?tab=readme-ov-file#skip-destructive-code-actions
   * @default true
   */
  organizeImportsSkipDestructiveCodeActions?: boolean;
}

// TODO: Include multiline array plugin when compatible with Prettier 3
// (https://github.com/electrovir/prettier-plugin-multiline-arrays/issues/26)

/**
 * Default (general) preset for Prettier.
 */
export const preset: IPrettierPreset<IBaseOptions> = {
  globalOptions: {
    // Built-in options:
    trailingComma: 'es5',
    tabWidth: 2,
    useTabs: false,
    semi: true, // Permitir consistencia con el estándar de TypeScript
    singleQuote: true,
    arrowParens: 'always',
    printWidth: 120,
    endOfLine: 'lf', // Para ahorrar problemas con Git.

    // Plugin's options:
    // - prettier-plugin-organize-imports:
    organizeImportsSkipDestructiveCodeActions: true,

    // - prettier-plugin-pkg:
  },

  plugins: [
    //
    'prettier-plugin-pkg',
    'prettier-plugin-organize-imports',
  ],

  overrideConfigs: [],
};
