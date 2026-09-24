import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Résolution des chemins absolus depuis src/
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
