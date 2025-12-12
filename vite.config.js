import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Listen on all local IPs
    port: 5173,      // Force port 5173
    strictPort: true // Fail if port is occupied
  },
  base: '/HoyaLotto/'
});
