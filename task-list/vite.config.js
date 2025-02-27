import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
