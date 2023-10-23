# @elegantech/prettier-multi-config

<!-- [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) -->

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/elegantech/prettier-multi-config)

Multi-configurations presets for [Prettier 3](https://prettier.io). Compatibility with some plugins (PHP, Blade templates, Bash, etc).

## Requirements

- Prettier >= 3.0.0: Base prettier and plugins are compatible with Prettier >= 3 only.
- Node.js:
  - Minimum: 14.18.0 (for ESM config compatibility and default plugins)
- npm:
  - Minimum: 7.2.0 (automatic install of `peerDependencies`).

> Note: Some optional plugins may require a more recent version of Node.js.

## Installing

> In the following instructions it will be used `npm`, but commands arguments are the same for `yarn`.

Add Prettier and this package to your project:

```sh
# Base Prettier 3
npm add -D --save-exact prettier

# This package
npm add -D @elegantech/prettier-multi-config
```

> Prettier's team recommends to use `--save-exact` for `prettier` dependency.

### Installing plugins dependencies

There are other optional dependencies that vary depending of the presets you are using. Check that sections for instructions.

Depending on how are you creating your own config file, you may choose to install the required plugins packages as:

- `devDependencies` (`-D`, `--save-dev`).
- `peerDependencies` (`--save-peer`).
- `dependencies`.

<!-- TODO: Add documentation about other types of installation -->

> In the following plugin installation instructions, it is assumed you are building your configuration directly into your project, and therefore plugin packages should be installed as `devDependencies` (using the `-D` npm/yarn alias).

## Available presets

There are some presets available with default configurations and plugins for specific languages or cases. These will help you create your own configuration file.

> Check for examples in the [Usage](#usage) section.

### Base preset (`base`)

Includes general base rules for all the languages/files officially supported by Prettier. Also, there are options for formatting the `package.json` file.

#### Required plugins:

- [prettier-plugin-pkg](https://github.com/un-ts/prettier/tree/master/packages/pkg)

```sh
npm add -D prettier-plugin-pkg
```

### PHP preset (`php`)

Compatibility with PHP.

> Note: You need to set the `phpVersion` option depending of your PHP environment.

#### Required plugins:

- [@prettier/plugin-php](https://github.com/prettier/plugin-php)

```sh
npm add -D @prettier/plugin-php
```

### Bash Script preset (`sh`)

Compatibility with Shell Script for Bash or sh.

#### Required plugins:

- [prettier-plugin-sh](https://github.com/un-ts/prettier/tree/master/packages/sh)

```sh
npm add -D prettier-plugin-sh
```

### Multiline preset (`multiline`)

Multiline elements for some languages.

#### Required plugins:

- [prettier-plugin-multiline-arrays](https://github.com/electrovir/prettier-plugin-multiline-arrays)

```sh
npm add -D prettier-plugin-multiline-arrays
```

## Usage

### Simple usage

Although this package is not intended to be used directly as a shared configuration or plugin, you can still use the default export as your prettier setup.

In your `package.json`:

```json
{
  "prettier": "@elegantech/prettier-multi-config"
}
```

Or in your `.prettierrc.json`:

```json
"@elegantech/prettier-multi-config"
```

> This includes the `base` preset only.

You can use this technique to create your shared configuration using this package. 😉

Check out the following sections to create your own customized configuration file.

### The config file

<!-- TODO: Add doc in VitePress or VuePress -->

You have to use `.js`, `.cjs` or `.mjs` formats to be able to customize your presets. As you can see, this package it's available for ESM and CommonJs modules.

Remember: If your project is an ESM (`{ "type": "module" }` in your `package.json`), by using `.prettierrc.js` it will `import` the ESM build, but in the other hand, it will be `require`d the commonjs version. To avoid this, you can use `.cjs` or `.mjs` extensions instead.

Initial state for `.prettier.mjs`:

```mjs
/** @type {import("prettier").Config} */
const config = {
  // ...
};

export default config;
```

Read more about config formats in the [Prettier documentation](https://prettier.io/docs/en/configuration.html).

### Examples

> Note: Most of the following examples will assume you are using `.prettierrc.mjs` (ESM), but you are free to use `.cjs` format instead.

In your `.prettier.mjs`:

```mjs
import {
  getMergedGlobalOptionsFor,
  getPluginsFor,
  getMergedOverrideFor,
} from '@elegantech/prettier-multi-config/presets';

const selectedPresets = [
  'base',
  'php',
  'sh',
];

/** @type {import("prettier").Config} */
const config = {
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
```

The order of included options is respected. Be careful of options

### Publish a package for your config file (🚧 WIP)

You can create a package that builds the config, using Typescript directly.

Check [this example](./examples/shareable-typescript) using unbuild to create a config.

🚧 WIP

<!-- TODO: Add instructions-->

## IDEs

### VS Code

Check the [.vscode](./.vscode/) directory for extensions and settings recommendations.

## Sponsors

- [Joinnus](https://www.joinnus.com/)

## License

Licensed under the [Apache License, Version 2.0](./NOTICE).
