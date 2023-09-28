import { getMergedGlobalOptionsFor, getMergedOverrideFor, getPluginsFor } from '@/presets';
import { Config } from 'prettier';

/**
 * The default config to be used as default.
 */
const config: Config = {
  ...getMergedGlobalOptionsFor(['base']),

  plugins: getPluginsFor(['base']),

  overrides: [
    //
    ...getMergedOverrideFor('base'),
  ],
};

export default config;
