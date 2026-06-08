import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Scout/',
  plugins: [react()],
  server: { port: 5173 }
})
