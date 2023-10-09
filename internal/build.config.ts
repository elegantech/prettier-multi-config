import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineBuildConfig } from 'unbuild';

import { CommentBuilder, EMPTY_NEW_LINE } from './utils/comment-builder';

// TODO: Move to a separated workspace

// Dev note: Use relative paths instead of TypeScript aliases for importing modules in build.config.ts (no compatible)

// eslint-disable-next-line @typescript-eslint/naming-convention
const INTERNAL_DIR = path.dirname(fileURLToPath(import.meta.url));

// console.log(EMPTY_NEW_LINE, 'Hola?');

export default defineBuildConfig([
  {
    name: 'Internal configs',
    entries: [
      {
        input: 'configs/prettierrc.ts',
        name: '.prettierrc',
      },
      //
      // './src/.prettierrc'
    ],

    rollup: {
      dts: {
        tsconfig: '../tsconfig.internal.json',
      },
      inlineDependencies: true,

      output: {
        exports: 'default',
        preserveModules: false,

        externalImportAssertions: false,
        inlineDynamicImports: true,
        banner: (chunk: { facadeModuleId: string }): string => {
          const sourceModule = 'internal/' + chunk.facadeModuleId.split('/internal/')[1];

          const commentBlock: CommentBuilder = new CommentBuilder({ type: 'block', startSymbol: '!' });

          // const PRINT_WIDTH = 80;
          // const SEPARATOR = '// '.padEnd(PRINT_WIDTH, '*');

          // const messageHeader = '// * This module was auto-generated. DO NOT EDIT DIRECTLY. '.padEnd(PRINT_WIDTH - 1, ' ') + '*';

          commentBlock
            .add('WARNING: This file was auto-generated. DO NOT EDIT DIRECTLY.')
            .add('Edit the source file and run `npm run build:internal`.')
            .add(EMPTY_NEW_LINE)
            .add(`Source: '${sourceModule}'`);

          return commentBlock.toString();
        },

        validate: true,
        // TODO: Make a way to throw error if any import is not resolved on build time for errors like
        // "@/aa" is imported by "internal/bb.ts", but could not be resolved – treating it as an external dependency.
      },
      emitCJS: false,
    },
    failOnWarn: true,

    declaration: false,
    alias: {
      // TODO: Replace with @rollup/plugin-typescript (https://github.com/rollup/plugins/tree/master/packages/typescript)
      '~': path.resolve(INTERNAL_DIR, '../src'),
      '~internal': path.resolve(INTERNAL_DIR, '.'),
    },
    rootDir: path.resolve(INTERNAL_DIR, '.'),
    clean: true, //! Important to be FALSE, to avoid clearing the project root 🤭.
    outDir: path.resolve(INTERNAL_DIR, '../build/internal'),
    // outDir: 'output',
  },
]);
