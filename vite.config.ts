import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BabyNeuralNetwork',
      fileName: (format) => `baby-neural-network.${format}.js`,
    },
  },
});
