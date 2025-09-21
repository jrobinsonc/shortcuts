import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import { baseDirectory } from '../utils/constants.js';
import baseConfig from './base.js';

const compat = new FlatCompat({
  baseDirectory,
});

/**
 * ESLint config for Next.js projects.
 */
const config = defineConfig([
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...baseConfig,
  ...compat.extends(
    'next/core-web-vitals',
    // I don't include `next/typescript` rules here because it's based on
    // plugin:@typescript-eslint/recommended and the base config included in this
    // repo is based on the strict and stylistic versions with already includes
    // the recommended rules.
    // https://nextjs.org/docs/app/api-reference/config/eslint#with-typescript
  ),
]);

export default config;
