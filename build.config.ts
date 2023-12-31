import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineBuildConfig } from 'unbuild';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

// const entries: BuildEntry[] = [
//   //
//   'index',
//   // 'configs/index',
//   // 'configs/php',
//   // 'utils/helpers',
// ].map((entry) => {
//   return { input: `./src/${entry}`, builder: 'rollup' };
// });

// console.log(entries);

export default defineBuildConfig([
  //! Package
  {
    // name: 'Distribution',
    // entries, // Let it autodetect entries from package.json
    rollup: {
      dts: {
        tsconfig: resolve(ROOT_DIR, './tsconfig.base.json'),
      },
      inlineDependencies: true,
      output: {
        preserveModules: true,
        inlineDynamicImports: false,
        // manualChunks: {},
      },
    },
    declaration: 'compatible',
    alias: {
      '~': resolve(ROOT_DIR, './src'),
    },
  },
]);
