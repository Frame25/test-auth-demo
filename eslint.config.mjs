import { FlatCompat } from '@eslint/eslintrc';
import pluginCypress from 'eslint-plugin-cypress/flat';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      cypress: pluginCypress,
    },
  },
  pluginCypress.configs.recommended,
  {
    files: ['**/*.cy.ts', '**/*.cy.tsx'],
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
          multiline: 'last',
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
    },
  },
];

export default eslintConfig;
