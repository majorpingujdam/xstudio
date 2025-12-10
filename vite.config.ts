import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: set base to '/your-repo-name/' if deploying to a subdirectory
// For custom domain or root: set base to '/'
const repoName = process.env.VITE_REPO_NAME || 'Final-prototype';
const base = process.env.NODE_ENV === 'production' && repoName ? `/${repoName}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})



