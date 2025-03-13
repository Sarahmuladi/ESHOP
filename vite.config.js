import { defineConfig } from 'vite'


export default defineConfig({
  
  server: {
    port: 3000,  
    hmr: {
      clientPort: 3000,
    },
  },
});

