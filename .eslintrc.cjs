/* eslint-env node */
module.exports = {
  // extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  // parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint'],
  // root: true,
  // overrides: {
  //   files: ['**/*.js']
  // }
  root: true,
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: [
        '@typescript-eslint',
      ],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:security/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.dev.json'],
      },
      rules: {
        "class-methods-use-this": 'off',
        "no-underscore-dangle": 'off',
        "import/prefer-default-export": 'off',
      }
    },
    {
      files: ['tests/**/*.ts'],
      env: {
        jest: true,
        node: true,
      }
    }
  ],
};
