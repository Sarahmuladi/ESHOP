import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Badilisha port kutoka 5173 kwenda 3000
    hmr: {
      clientPort: 3000,
    },
  },
});

