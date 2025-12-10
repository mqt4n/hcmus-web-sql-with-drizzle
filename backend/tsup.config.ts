import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts', 'src/**/*.ts'],
  format: ['cjs'],
  dts: false, // Disable DTS to avoid issues with external schema files
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
});
