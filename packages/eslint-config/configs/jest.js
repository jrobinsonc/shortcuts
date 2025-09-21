import pluginJest from 'eslint-plugin-jest';
import { defineConfig } from 'eslint/config';

/**
 * ESLint config for Jest.
 */
const config = defineConfig([
  {
    files: ['**/*.{spec,test}.{ts,tsx}'],
    ...pluginJest.configs['flat/style'],
    ...pluginJest.configs['flat/recommended'],
  },
]);

export default config;
