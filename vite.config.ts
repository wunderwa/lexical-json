import dts from 'vite-plugin-dts'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'

export default defineConfig({
  server: {
    port: 4006,
  },
  base: './',
  plugins: [dts({ rollupTypes: true }), react()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'mllib',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
} satisfies UserConfig)
