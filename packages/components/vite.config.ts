import { defineConfig } from 'vite';

export default defineConfig({
 test: {
  globals: true,
  environment: 'happy-dom',
  coverage: {
   reporter: ['text', 'html'],
  },
  reporters: 'dot',
 },
});
