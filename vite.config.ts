import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  base: '/ummi-wallet/',
  server: {
    port: 8081,
  },
  build: {
    outDir: 'dist',
  },
})
