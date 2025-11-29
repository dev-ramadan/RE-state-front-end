import { defineConfig } from 'vitest/config'; //npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
import react from '@vitejs/plugin-react-swc'; //npm install -D @vitejs/plugin-react-swc
import tailwindcss from '@tailwindcss/vite'; //npm install tailwindcss @tailwindcss/vite

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
