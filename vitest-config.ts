/// <reference types="vitest" />

import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig, type UserConfig } from 'vitest/config';
import { resolve } from 'path';

const config = defineConfig({
  test: {
    ...configDefaults, // Extending Vitest's default options
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
}) as UserConfig;

export default config;
