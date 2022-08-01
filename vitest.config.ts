import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

export default defineConfig({
  plugins: [
    vue({}) as any, // @TODO: Fix type error on here
  ],
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: join(__dirname, 'src'),
    }]
  },
  test: {

    globals: true,
    include: ['./tests/**/*.spec.ts'],
    exclude: ['packages'],
    environment: 'node',
  },
})
