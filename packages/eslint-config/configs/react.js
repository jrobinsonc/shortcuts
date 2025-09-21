import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import baseConfig from './base.js';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import { switchRulesRecordToWarning } from '../utils/switchToWarnings.js';

/**
 * @type {import("eslint").Linter.Config}
 */
const jsxA11yRecommendedConfig = pluginJsxA11y.flatConfigs.recommended;

/**
 * A shared ESLint configuration for React projects or libraries that use React.
 */
const config = defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    ...pluginReactHooks.configs['recommended-latest'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...jsxA11yRecommendedConfig,
    languageOptions: {
      ...jsxA11yRecommendedConfig.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...switchRulesRecordToWarning(jsxA11yRecommendedConfig.rules),
    },
  },
]);

export default config;
