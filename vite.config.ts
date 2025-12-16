import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tanstack/react-query': fileURLToPath(new URL('./src/lib/react-query.tsx', import.meta.url)),
    },
  },
})
