import { defineConfig } from '@playwright/test';
import { BASE } from './src/data/site';

// El sitio se sirve bajo la subruta BASE (/plancha-app). `astro preview` levanta
// el build en el puerto 4321 por defecto.
const PORT = 4321;

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: 'npm run build && npm run preview',
    url: `http://localhost:${PORT}${BASE}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
