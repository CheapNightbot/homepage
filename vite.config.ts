import path from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: 'dist'
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
