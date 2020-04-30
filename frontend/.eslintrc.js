const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/jsx-curly-newline': 0,
    'no-console': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx', '**/*.stories.tsx', 'craco.config.js', 'src/setupTests.ts'] },
    ],
    'spaced-comment': [2, 'always', { markers: ['/'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
        'import/no-unresolved': 0,
      },
    },
    {
      files: ['**/store/*.ts'],
      rules: {
        'no-param-reassign': 0,
      },
    },
    {
      files: ['**/models/*.ts'],
      rules: {
        'import/no-cycle': 0,
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
        extensions: ['.js', '.ts', '.tsx'],
      },
      typescript: {
        directory: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
};
