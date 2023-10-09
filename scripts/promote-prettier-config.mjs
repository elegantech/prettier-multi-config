/* eslint-disable no-console */
/*
 * Validates and promotes the compiled Prettier config.
 */
import { renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { exit } from 'node:process';

import chalk from 'chalk';
import * as prettier from 'prettier';

import { BUILD_DIR, ROOT_DIR } from './constants/directories.mjs';
import { INVALID_INPUT_ERROR, NOT_FOUND_ERROR } from './constants/exit-codes.mjs';

const internalOutputDirectory = path.resolve(BUILD_DIR, 'internal');

const inputPrettierConfigPath = internalOutputDirectory + '/.prettierrc.mjs';

/**
 * @type {string | null}
 */
let found = null;

try {
  console.log(chalk.cyanBright('Searching the config file...'));

  found = await prettier.resolveConfigFile(internalOutputDirectory, {
    config: inputPrettierConfigPath,
  });
} catch (error) {
  console.error(chalk.red('Unable to parse the config file.'));

  console.error(error);

  exit(INVALID_INPUT_ERROR);
}

if (!found || found !== inputPrettierConfigPath) {
  console.error(chalk.redBright('Prettier config not found.'));
  console.error(chalk.yellowBright('Did you forget to run `npm run build:internal`?'));

  exit(NOT_FOUND_ERROR);
}

console.log(chalk.greenBright('  Found!'));

const jsonPath = internalOutputDirectory + '/.prettierrc.json';

try {
  console.log(chalk.cyanBright('Converting config file to JSON format...'));

  const configFile = await import(found);

  writeFileSync(jsonPath, JSON.stringify(configFile.default, null, 2));
} catch (error) {
  console.error(chalk.redBright('Unable to convert the config file to JSON format.'));

  console.error(error);

  exit(INVALID_INPUT_ERROR);
}

const relativeJsonPrettierConfigPath = path.relative(ROOT_DIR, jsonPath);

console.log(chalk.greenBright('  Config file "%s" created successfully!'), relativeJsonPrettierConfigPath);

// const object = readFileSync(found, 'utf8');

// console.log(configFile);

const outputPrettierConfigPath = ROOT_DIR + '/.prettierrc.json';

console.log(chalk.cyanBright('Promoting Prettier config to root directory...'));

renameSync(jsonPath, outputPrettierConfigPath);

const relativePrettierConfigPath = path.relative(ROOT_DIR, outputPrettierConfigPath);

console.log(chalk.greenBright('  Done!'));
console.log(chalk.bold('  ✔ %s'), relativePrettierConfigPath);
