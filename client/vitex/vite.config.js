import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'single-page-app-fallback',
      configureServer(server) {
        server.middlewares.use(history());
      },
    },
  ],
  esbuild: {
    // avoid eval-like code during dev transforms
    legalComments: 'none',
  },
  build: {
    sourcemap: true, // safe source maps without eval
  },
  server: {
    sourcemap: false, // or remove for stricter CSP
  },
});