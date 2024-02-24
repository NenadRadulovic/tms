/// <reference types="vitest" />

import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig, type UserConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    ...configDefaults, // Extending Vitest's default options
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: '@appCommon', replacement: resolve(__dirname, './src/common') },
      { find: '@appTypes', replacement: resolve(__dirname, './src/types') },
    ],
  },
}) as UserConfig;

export default config;
