import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineBuildConfig } from 'unbuild';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));

// FIXME: Do not work yet

export default defineBuildConfig({
  rollup: {
    dts: {
      tsconfig: path.resolve(ROOT_DIR, './tsconfig.json'),
    },
    inlineDependencies: false,
    output: {
      preserveModules: true,
    },
  },

  externals: [
    // Skip the next lines in your own repository; this is intended for local development only
    '@elegantech/prettier-multi-config',
    '@elegantech/prettier-multi-config/*',
  ],
  declaration: 'compatible',
  alias: {
    '~': path.resolve(ROOT_DIR, './src'),
  },
  outDir: path.resolve(ROOT_DIR, './dist'),
});
