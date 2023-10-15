const eslintCmd = 'eslint --fix';
const prettierCmd = 'prettier --ignore-unknown --write';

// FIXME: tsc for specific files.
// TODO: Run tsc in the entire project (-p tsconfig.x.json) instead of per-file
// https://github.com/lint-staged/lint-staged?tab=readme-ov-file#example-wrap-filenames-in-single-quotes-and-run-once-per-file
// const tscCmd = 'tsc --noEmit';

export default {
  // Javascript sources
  '*.{js,cjs,mjs}': [eslintCmd, prettierCmd],

  // Typescript sources
  '*.{ts,cts,mts}': [eslintCmd, prettierCmd],

  // Other files
  '*!(.{js,cjs,mjs,ts,cts,mts})': [prettierCmd],
  '.prettierrc.json': () => 'npm run lint:prettier-config',
};
