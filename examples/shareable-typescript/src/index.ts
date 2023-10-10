import {
  PresetName,
  getMergedGlobalOptionsFor,
  getMergedOverrideFor,
  getPluginsFor,
} from '@elegantech/prettier-multi-config/presets';
import { Config } from 'prettier';

const selectedPresets: PresetName[] = ['base', 'php', 'sh'];

const config: Config = {
  // Add global configurations for selected presets
  ...getMergedGlobalOptionsFor(selectedPresets, {
    // Here you can add your own global options
  }),

  // Add plugins for selected presets
  plugins: getPluginsFor(selectedPresets, [
    // Here you can add other plugins
    'prettier-plugin-organize-imports',
  ]),

  overrides: [
    // Specific options for presets
    ...getMergedOverrideFor('base'),
    ...getMergedOverrideFor('php', {
      config: {
        // You can override some default options in the preset
        options: { phpVersion: '8.1' },
      },
    }),
    ...getMergedOverrideFor('sh'),

    // Here ypu can add your custom config override
    {
      files: ['.prettierrc.json'],
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
