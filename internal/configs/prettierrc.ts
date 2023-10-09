import { Config } from 'prettier';

import { getMergedGlobalOptionsFor, getMergedOverrideFor, getPluginsFor } from '~/presets';

/**
 * The default config to be used as default.
 */
const config: Config = {
  ...getMergedGlobalOptionsFor(['base', 'sh']),

  plugins: getPluginsFor(['base', 'sh']),

  overrides: [
    //
    ...getMergedOverrideFor('base'),
    ...getMergedOverrideFor('sh'),
    {
      files: ['.prettierrc.json'],
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
