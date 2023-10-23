// const path = require('node:path');

/**
 * @type {import('eslint').Linter.RulesRecord}
 */
const defaultRules = {
  'unicorn/no-null': 'off',
  'no-console': 'warn',
  'unicorn/prefer-module': 'warn',
  'import/no-self-import': 'error',
  'import/order': [
    'warn',
    {
      'newlines-between': 'always',
      alphabetize: {
        // De esto se encarga el prettier
        order: 'ignore',
      },
      groups: [
        //
        'builtin',
        'external',
        'internal',
        [
          //
          'index',
          'parent',
          'sibling',
        ],
      ],
      pathGroups: [
        {
          pattern: '~/**',
          group: 'internal',
        },
        {
          pattern: '~internal/**',
          group: 'internal',
        },
        {
          pattern: '~tests/**',
          group: 'internal',
        },
      ],
    },
  ],
  'import/newline-after-import': [
    'warn',
    {
      count: 1,
      considerComments: true,
    },
  ],
};

/**
 * @type {import('eslint').Linter.RulesRecord}
 */
const defaultTypescriptRules = {
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
      prefix: ['I'],
    },

    // Enforce that type parameters (generics) are prefixed with T
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
      prefix: ['T'],
    },
    {
      selector: 'parameter',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },

    {
      // Enforce that all variables, functions and properties follow are camelCase
      selector: 'variableLike',
      format: ['camelCase'],
    },

    {
      // Enforce that boolean variables are prefixed with an allowed verb
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: [
        'is',
        'should',
        'has',
        'can',
        'did',
        'will',
      ],
    },

    {
      // Enforce that all variables are either in camelCase or UPPER_CASE
      selector: 'variable',
      format: [
        'camelCase',
        'UPPER_CASE',
      ],
    },
    {
      // Ignore destructured names
      selector: 'variable',
      modifiers: ['destructured'],
      format: null,
    },
    {
      // Ignore properties that require quotes
      selector: [
        'classProperty',
        'objectLiteralProperty',
        'typeProperty',
        'classMethod',
        'objectLiteralMethod',
        'typeMethod',
        'accessor',
        'enumMember',
      ],
      format: null,
      modifiers: ['requiresQuotes'],
    },
  ],
};

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,

  ignorePatterns: [
    'node_modules',
    'build',
    'dist',
    '!.*',
    'examples',
  ],

  overrides: [
    {
      files: [
        '*.js',
        '*.mjs',
        '*.cjs',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
      },
      extends: [
        //
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:import/recommended',
        'plugin:unicorn/recommended',
        'prettier',
      ],
      plugins: [
        //
        'node',
        'import',
        'unicorn',
      ],
      rules: {
        ...defaultRules,
        // Helps import the correct file extension
        'import/extensions': [
          'error',
          'always',
          { ignorePackages: true },
        ],
        'node/no-unsupported-features/es-syntax': ['off'],
      },
    },
    {
      files: [
        '*.ts',
        '*.mts',
        '*.cts',
        '*.tsx',
      ],
      extends: [
        'eslint:recommended',
        'plugin:unicorn/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        'import',
        'unicorn',
      ],
      parserOptions: {
        EXPERIMENTAL_useProjectService: true,
        // project: true,
        // tsconfigRootDir: path.dirname('./'),
        // project: 'tsconfig.json',
        // project: [
        //   //
        //   './tsconfig.base.json',
        //   './tsconfig.configs.json',
        //   './tsconfig.internal.json',
        //   './tsconfig.test.json',
        //   './tsconfig.main.json',
        //   // './examples/**/tsconfig.json',
        // ],
      },
      rules: {
        ...defaultRules,
        ...defaultTypescriptRules,
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
};
