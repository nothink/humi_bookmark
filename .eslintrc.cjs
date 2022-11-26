const { readGitignoreFiles } = require('eslint-gitignore')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard-with-typescript',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {},
  ignorePatterns: readGitignoreFiles({ cwd: __dirname }).concat(['_old']),
}
