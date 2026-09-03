import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const pages = new Set([
  'index.html',
  'workshop.html',
  'fabric-foundry.html',
  'hosted-agents.html',
  'protocols.html',
])
const requestedPage = process.env.BUILD_PAGE ?? 'index.html'

if (!pages.has(requestedPage)) throw new Error(`Unsupported BUILD_PAGE: ${requestedPage}`)

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    emptyOutDir: process.env.BUILD_CLEAN === 'true',
    rollupOptions: {
      input: requestedPage,
    },
  },
})
