import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: set base to '/your-repo-name/' if deploying to a subdirectory
// IMPORTANT: Change 'Final-prototype' to match your actual GitHub repository name
const repoName = 'Final-prototype';
const base = process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})



