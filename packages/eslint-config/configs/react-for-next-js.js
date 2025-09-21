import nextJs from './next-js.js';

/**
 * ESLint config for react components that will be used in a Next.js project.
 */
const config = nextJs.map((config) => {
  const pluginsNames =
    config.plugins === undefined ? [] : Object.keys(config.plugins);

  if (pluginsNames.length === 1 && pluginsNames.includes('@next/next')) {
    return {};
  }

  return config;
});

export default config;
