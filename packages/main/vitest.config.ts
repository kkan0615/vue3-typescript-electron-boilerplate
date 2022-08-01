import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    // alias: [{
    //   find: '@',
    //   replacement: join(__dirname, 'src'),
    // }]
  },
  test: {
    globals: true,

    include: ['tests/**/*.spec.ts', 'src/**/*.spec.ts'],
    environment: 'node',
  },
})
