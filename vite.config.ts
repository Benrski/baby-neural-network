import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'BNN',
      fileName: (format) => `bnn.${format}.js`,
    },
  },
});
