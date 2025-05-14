import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    environmentMatchGlobs: [['src/**', 'node']],
  },
  plugins: [await tsconfigPaths()],
})
