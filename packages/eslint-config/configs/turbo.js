import turboPlugin from 'eslint-plugin-turbo';
import { defineConfig } from 'eslint/config';

/**
 * A shared ESLint configuration for projects in a turbo repo.
 *
 * @type {import("eslint").Linter.Config[]}
 */
const config = defineConfig([
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
]);

export default config;
