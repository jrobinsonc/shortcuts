import { existsSync } from 'fs';
import { dirname, resolve } from 'path';

const tsConfigFile = existsSync('tsconfig.json')
  ? resolve('tsconfig.json')
  : '';
export const baseDirectory = dirname(tsConfigFile);

if (tsConfigFile === '' || baseDirectory === '.') {
  throw new Error(
    "The TypeScript config file (`tsconfig.json`) could not be found and it's required for type-aware rules.",
  );
}
