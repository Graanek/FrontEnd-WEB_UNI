import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': 'lucide-react/dist/esm/lucide-react'
    }
  },
  optimizeDeps: {
    include: ['lucide-react']
  }
});