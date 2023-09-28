# @elegantech/prettier-multi-config

Multi-configurations presets for [Prettier 3](https://prettier.io). Compatibility with some plugins (PHP, Blade templates, Bash, etc).

## Requirements

- Prettier >= 3.0.0: Base prettier and plugins are compatible with Prettier >= 3 only.
- Node.js:
  - Minimum: 14.18.0 (for ESM config compatibility and default plugins)
- npm:
  - Minimum: 7.2.0 (automatic install of `peerDependencies`).

> Note: Some optional plugins may require an updated version of Node.js.

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

> There are other optional dependencies, but will be described below.

## Usage

<!-- TODO: Add doc in VitePress or VuePress -->

This package is not intended to be used directly as a shared config, nor a plugin, but instead a serie of presets for some formats.

You have to use `.js`, `.cjs` or `.mjs` formats to be able to customize your presets. As you can see, this package it's available for ESM and CommonJs modules.

Remember: If your project is an ESM (`{ "type": "module" }` in your `package.json`), by using `.prettierrc.js` it will `import` the ESM build, but in the other hand, it will be `require`d the commonjs version. To avoid this, you can use `.cjs` or `.mjs` extensions instead.

> Note: Most of the following examples will assume you are using `.prettierrc.mjs` (ESM), but you are free to use `.cjs` format instead.

## Presets

| Name   | Files   |
| ------ | ------- |
| `base` | `*`     |
| `php`  | `*.php` |

### Base preset (`base`)

Includes general base rules for all the languages/files officially supported by Prettier. Also, there are options for formatting the `package.json` file.

`.prettierrc.mjs`:

```mjs
import { defaultConfig } from '@elegantech/prettier-multi-config';

const config = {
  // This includes the global options and the default plugins
  ...defaultConfig,
};

export default config;
```

`.prettierrc.cjs`:

```cjs
const { defaultConfig } = require('@elegantech/prettier-multi-config');

module.exports = {
  ...defaultConfig,
};
```

#### Required plugins:

- [prettier-plugin-pkg](https://github.com/un-ts/prettier/tree/master/packages/pkg)

```sh
npm add -D prettier-plugin-pkg
```

### Including PHP preset (`php`)

Compatibility with PHP.

> Note: You need to set the `phpVersion` option depending of your PHP environment.

```mjs
import { defaultConfig } from '@elegantech/prettier-multi-config';

const config = {
  // This includes the global options and the default plugins
  ...defaultConfig,
};

export default config;
```

#### Included plugins:

- [@prettier/plugin-php](https://github.com/prettier/plugin-php)

```sh
npm add -D @prettier/plugin-php
```

## IDEs

### VS Code

Check the [.vscode](./.vscode/) directory for extensions and settings recommendations.

## Sponsors

- [Joinnus](https://www.joinnus.com/)
