import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      tsconfig: './tsconfig.tests.json',
    },
    environment: 'node',
    coverage: {
      reportsDirectory: './build/test-coverage',
    },
    // dir: 'tests',
  },
  resolve: {
    alias: {
      // '@': path.resolve(path.dirname(fileURLToPath(new URL('src', import.meta.url)))),
      '~': path.resolve('./src'),
      '~tests': path.resolve('./tests'),
      '~internal': path.resolve('./internal/src'),
    },
  },
  appType: 'custom',
});
