import { defineConfig } from 'vite'
import path from 'path'
import { readdirSync } from 'fs'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: Object.fromEntries(
        (readdirSync(path.resolve(__dirname, 'src'), { recursive: true }) as Array<string>)
          .filter(file => file.endsWith('.entry.ts'))
          .map(file => [file.replace('.entry.ts', ''), path.resolve(__dirname, 'src', file)])
      ),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      }
    },
    watch: {
      include: [
        path.resolve(__dirname, 'src/**'),
        path.resolve(__dirname, 'static/**'),
      ],
      chokidar: {
        usePolling: true,
        useFsEvents: true
      }
    }
  },
  publicDir: '../static',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [],
})
